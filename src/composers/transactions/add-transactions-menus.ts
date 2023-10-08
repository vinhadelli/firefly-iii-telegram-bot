import dayjs from 'dayjs'
import debug from 'debug'
import flatten from 'lodash.flatten'

import { Menu, MenuRange } from '@grammyjs/menu'
import type { MyContext } from '../../types/MyContext'
import { AccountTypeFilter } from '../../lib/firefly/model/account-type-filter'
import { AccountRead } from '../../lib/firefly/model/account-read'
import { TransactionTypeProperty } from '../../lib/firefly/model/transaction-type-property'

import {
  formatTransaction,
  createPaginationRange,
  createFireflyTransaction,
} from '../helpers'

import { MENUS } from '../constants'

import firefly from '../../lib/firefly'

const rootLog = debug(`transactions:add:menus`)

type MaybePromise<T> = T | Promise<T>;
type MenuMiddleware<MyContext> = (ctx: MyContext) => MaybePromise<unknown>;

// This is the main Add New Transaction menu generation
export const addTransactionMenu = new Menu<MyContext>(MENUS.ADD_TRANSACTION)
  .dynamic(createCategoriesRange(newTransactionSelectCategoryHandler))
  .append(createNewDepositSubmenu())
  .append(createNewTransferSubmenu())
  .text('🔙', ctx => ctx.deleteMessage())

addTransactionMenu.register([
  createNewDepositMenu(),
  createNewTransferMenu()
])

// This is the menu for every transaction created
// NOTE: Make sure to set `ctx.session.currentTransaction = tr` everytime you
// call the transactionMenu
export const transactionMenu = new Menu<MyContext>(MENUS.TRANSACTION)
  .dynamic(createTransactionMenu)

const editTransactionMenu = new Menu<MyContext>(MENUS.EDIT_TRANSACTION).dynamic(ctx => {
  const transactionId = ctx.match
  if (typeof transactionId !== 'string') throw new Error('No transactionId supplied!')
  return createEditTransactionMenu(transactionId, ctx)
})

transactionMenu.register([
  editTransactionMenu,
  createEditCategoryMenu(),
  // createEditSourceAccountMenu(),
  // createEditDestAccountMenu(),
  // createEditAmountMenu(),
  // createEditDescriptionMenu(),
  // createDeleteTransactionmenu(),
  // createEditTagsMenu(),
])

////////////////////////////////////////////////////////////////////////////////////

// TODO: Refactor the functions bellow in order to generalize them, because for
// deposit and for transfer transactions the flow looks pretty much the same.

// TODO: Implement additional step when source currency differs from the
// destination currency. In this case we want to ask a user to provide a
// foreign amount value.

function createNewDepositSubmenu() {
  return new MenuRange<MyContext>().submenu(
    ctx => ctx.i18n.t('labels.TO_DEPOSITS'),
    MENUS.NEW_DEPOSIT,
    ctx => ctx.editMessageText(
      ctx.i18n.t('transactions.add.selectRevenueAccount', { amount: ctx.session.newTransaction.amount }),
      { parse_mode: 'Markdown' }
    )
  ).row()
}

function createNewDepositMenu() {
  const menuLogger = rootLog.extend('createNewDepositMenu:🔢')

  const newDepositMenu = new Menu<MyContext>(MENUS.NEW_DEPOSIT)
    .dynamic(async ctx => {
      const log = menuLogger.extend('1')
      log(' Starting creation of deposit transaction')
      log(' Preparing accounts menu to select one as a source of deposit transaction...')

      // ctx.session.newTransaction.type = TransactionTypeProperty.Deposit

      const accounts = await getAccounts(ctx, AccountTypeFilter.Revenue)

      const range = new MenuRange<MyContext>()

      for (let i = 0; i < accounts.length; i++) {
        const acc = accounts[i]
        const last = accounts.length - 1
        range.submenu(
          { text: acc.attributes.name, payload: acc.id },
          MENUS.NEW_DEPOSIT__SELECT_TARGET_ACC,
          async ctx => {
            // ctx.reply(`Source account ID is *${acc.attributes.name}*`, { parse_mode: 'Markdown' })

            ctx.session.newTransaction.sourceAccount = {
              id: acc.id,
              name: acc.attributes.name,
              type: acc.attributes.type,
              currencyId: acc.attributes.currency_id,
              currencySymbol: acc.attributes.currency_symbol
            }

            log('ctx.session.newTransaction: %O', ctx.session.newTransaction)

            return ctx.editMessageText(
              ctx.i18n.t('transactions.add.selectDestAccount', { amount: ctx.session.newTransaction.amount }), {
              parse_mode: 'Markdown',
            })
          }
        )
        // Split categories keyboard into two columns so that every odd indexed
        // category starts from new row as well as the last category in the list.
        if (i % 2 !== 0 || i === last) range.row()
      }

      return range
    })
    .back('🔙')

  const newDepositSelectTargetAccountMenu = new Menu<MyContext>(MENUS.NEW_DEPOSIT__SELECT_TARGET_ACC)
    .dynamic(async ctx => {
      const log = menuLogger.extend('1:2')
      log(' Continue creating a deposit transaction')
      log(' Having obtained source account, lets select the destination one...')

      const accounts = await getAccounts(ctx, [AccountTypeFilter.Asset, AccountTypeFilter.Liabilities])

      const range = new MenuRange<MyContext>()

      for (let i = 0; i < accounts.length; i++) {
        const acc = accounts[i]
        const last = accounts.length - 1
        range.text(
          { text: acc.attributes.name, payload: acc.id },
          async ctx => {
            ctx.session.newTransaction.destAccount = {
              id: acc.id,
              name: acc.attributes.name,
              type: acc.attributes.type
            }

            log('ctx.session.newTransaction: %O', ctx.session.newTransaction)

            // ctx.reply(`Destination account ID is *${acc.attributes.name}*`, { parse_mode: 'Markdown' })

            const tr = await createFireflyTransaction(ctx)

            ctx.session.currentTransaction = tr

            return ctx.editMessageText(
              formatTransaction(ctx, tr),
              {
                parse_mode: 'Markdown',
                reply_markup: transactionMenu
              }
            )
          }
        )
        // Split categories keyboard into two columns so that every odd indexed
        // category starts from new row as well as the last category in the list.
        if (i % 2 !== 0 || i === last) range.row()
      }

      return range
    })
    .back('🔙')

  newDepositMenu.register(newDepositSelectTargetAccountMenu)
  return newDepositMenu
}

function createNewTransferSubmenu() {
  return new MenuRange<MyContext>().submenu(
    ctx => ctx.i18n.t('labels.TO_TRANSFERS'),
    MENUS.NEW_TRANSFER,
    ctx => ctx.editMessageText(
      ctx.i18n.t('transactions.add.selectSourceAccount', { amount: ctx.session.newTransaction.amount }),
      { parse_mode: 'Markdown' }
    )
  ).row()
}

function createNewTransferMenu() {
  const menuLogger = rootLog.extend('createNewTransferMenu:🔢')

  const newTransferMenu = new Menu<MyContext>(MENUS.NEW_TRANSFER)
    .dynamic(async ctx => {
      const log = menuLogger.extend('1')
      log(' Starting creation of transfer transaction')
      log(' Preparing accounts menu to select one as a source of transfer transaction...')

      // ctx.session.newTransaction.type = TransactionTypeProperty.Transfer

      const accounts = await getAccounts(
        ctx,
        [AccountTypeFilter.Asset, AccountTypeFilter.Liabilities],
      )

      const range = new MenuRange<MyContext>()

      for (let i = 0; i < accounts.length; i++) {
        const acc = accounts[i]
        const last = accounts.length - 1
        range.submenu(
          { text: acc.attributes.name, payload: acc.id },
          MENUS.NEW_TRANSFER__SELECT_TARGET_ACC,
          async ctx => {
            log('ctx.session.newTransaction: %O', ctx.session.newTransaction)

            ctx.reply(`Source account ID is *${acc.attributes.name}*`, { parse_mode: 'Markdown' })

            ctx.session.newTransaction.sourceAccount = {
              id: acc.id,
              name: acc.attributes.name,
              type: acc.attributes.type
            }

            return ctx.editMessageText(
              ctx.i18n.t('transactions.add.selectDestAccount', { amount: ctx.session.newTransaction.amount }), {
              parse_mode: 'Markdown',
            })
          }
        )
        // Split categories keyboard into two columns so that every odd indexed
        // category starts from new row as well as the last category in the list.
        if (i % 2 !== 0 || i === last) range.row()
      }

      return range
    })
    .back('🔙')

  const newTransferSelectTargetAccountMenu = new Menu<MyContext>(MENUS.NEW_DEPOSIT__SELECT_TARGET_ACC)
    .dynamic(async ctx => {
      const log = menuLogger.extend('1:2')
      log(' Continue creating a transfer transaction')
      log(' Having obtained source account, lets select the destination one...')

      const accounts = await getAccounts(
        ctx,
        [AccountTypeFilter.Asset, AccountTypeFilter.Liabilities],
        { skipAccountId: ctx.session.newTransaction.sourceAccount?.id! }
      )
      log('Got accounts: %O', accounts)

      const range = new MenuRange<MyContext>()

      for (let i = 0; i < accounts.length; i++) {
        const acc = accounts[i]
        const last = accounts.length - 1
        range.text(
          { text: acc.attributes.name, payload: acc.id },
          async ctx => {
            ctx.session.newTransaction.destAccount = {
              id: acc.id,
              name: acc.attributes.name,
              type: acc.attributes.type
            }

            log('ctx.session.newTransaction: %O', ctx.session.newTransaction)

            // ctx.reply(`Destination account ID is *${acc.attributes.name}*`, { parse_mode: 'Markdown' })

            const tr = await createFireflyTransaction(ctx)
            ctx.session.currentTransaction = tr

            return ctx.editMessageText(
              formatTransaction(ctx, tr),
              {
                parse_mode: 'Markdown',
                reply_markup: transactionMenu
              }
            )
          }
        )
        // Split categories keyboard into two columns so that every odd indexed
        // category starts from new row as well as the last category in the list.
        if (i % 2 !== 0 || i === last) range.row()
      }

      return range
    })
    .back('🔙')

  newTransferMenu.register(newTransferSelectTargetAccountMenu)
  return newTransferMenu
}

async function getAccounts(
  ctx: MyContext,
  accountType: AccountTypeFilter | AccountTypeFilter[],
  opts?: { skipAccountId: string }
) {
  const log = rootLog.extend('getAccounts')
  try {
    let accounts: AccountRead[] = []
    const now = dayjs().format('YYYY-MM-DD')

    if (Array.isArray(accountType)) {
      const promises: any = []
      accountType.forEach(accType => promises.push(firefly(ctx.session.userSettings).Accounts.listAccount(1, now, accType)))
      const responses = await Promise.all(promises)

      log('Responses length: %s', responses.length)

      accounts = flatten(responses.map(r => {
        return r.data.data
      }))

    } else {
      accounts = (await firefly(ctx.session.userSettings).Accounts.listAccount(1, now, accountType)).data.data
    }

    log('accounts: %O', accounts)

    // Prevent from choosing same account when doing transfers
    if (opts) accounts = accounts.filter(acc => opts.skipAccountId !== acc.id.toString())

    accounts = accounts.reverse() // we want top accounts be closer to the bottom of the screen

    return accounts

  } catch (err) {
    log('Error: %O', err)
    console.error('Error occurred creating acounts keyboard: ', err)
    throw err
  }
}

function createCategoriesRange(onCategorySelectHandler: MenuMiddleware<MyContext>) {
  return function() {
    const log = rootLog.extend('createCategoriesRange')
    log(' Creating categories range...')
    return new MenuRange<MyContext>().dynamic(async (ctx, range) => {
      const categories = ctx.session.categories
      const transactionId = ctx.match
      log('Transaction ID: %s', transactionId)

      // User might not have any categories yet
      // TODO: Implement the case when a user has no categories.
      //
      // HINT: ctx.editMessageText(ctx.i18n.t('transactions.add.noCategoriesYet'))

      for (let i = 0; i < categories.length; i++) {
        const c = categories[i]
        range.text(
          { text: c.attributes.name, payload: c.id },
          onCategorySelectHandler
        )
        const last = categories.length - 1
        // Split categories keyboard into two columns so that every odd indexed
        // category starts from new row as well as the last category in the list.
        if (i % 2 !== 0 || i === last) range.row()
      }

      range.append(
        createPaginationRange(
          ctx,
          // Previous page handler
          async (ctx: MyContext) => {
            const userSettings = ctx.session.userSettings
            const resData = (await firefly(userSettings).Categories.listCategory(ctx.session.pagination?.current_page! - 1)).data
            log('resData.meta: %O', resData.meta)
            ctx.session.pagination = resData.meta.pagination
            ctx.session.categories = resData.data
            await ctx.menu.update()
          },
          // Next page handler
          async (ctx: MyContext) => {
            const userSettings = ctx.session.userSettings
            const resData = (await firefly(userSettings).Categories.listCategory(ctx.session.pagination?.current_page! + 1)).data
            log('resData.meta: %O', resData.meta)
            ctx.session.pagination = resData.meta.pagination
            ctx.session.categories = resData.data
            await ctx.menu.update()
          }
        )
      )

      return range.row().back('🔙')
    })
  }
}

function createTransactionMenu() {
  async function menuClickHandler(ctx: MyContext) {
    const log = rootLog.extend('transactionMenuHandler')
    try {
      const userSettings = ctx.session.userSettings
      const trId = ctx.match
      if (typeof trId !== 'string') throw new Error('No transactionId supplied!')
      log('Transaction ID: %s', trId)
      const tr = (await firefly(userSettings).Transactions.getTransaction(trId)).data.data
      log('Got transaction: %O', tr)
      ctx.session.editTransactions.push(tr)
    } catch (err) {
      console.error(err)
      log('Error occured handling menu click: %O', err)
      ctx.reply((err as Error).toString())
    }
  }
  return new MenuRange<MyContext>().dynamic((ctx, range) => {
    // If transaction does not have a category, show button to specify one
    if (!ctx.session.currentTransaction!.attributes.transactions[0].category_id) {
      range.submenu(
        {
          text: ctx.i18n.t('labels.CHANGE_CATEGORY'),
          payload: ctx.session.currentTransaction!.id
        },
        MENUS.EDIT_TRANSACTION__EDIT_CATEGORY,
        menuClickHandler
      )
    }

    range.submenu(
      {
        text: ctx => ctx.i18n.t('labels.EDIT_TRANSACTION'),
        payload: ctx.session.currentTransaction!.id
      },
      MENUS.EDIT_TRANSACTION,
      menuClickHandler
    )

    return range
  })
}

function createEditTransactionMenu(transactionId: string, ctx: MyContext) {
  const { fireflyUrl } = ctx.session.userSettings
  return new MenuRange<MyContext>()
    .submenu(
      {
        text: ctx.i18n.t('labels.CHANGE_CATEGORY'),
        payload: transactionId
      },
      MENUS.EDIT_TRANSACTION__EDIT_CATEGORY,
    )
    .row()
    .text({
      text: ctx => ctx.i18n.t('labels.CHANGE_SOURCE_ACCOUNT'),
      payload: transactionId
    },
      ctx => ctx.reply(`Aloha! transactionId is ${ctx.match}`)
    )
    .text({
      text: ctx => ctx.i18n.t('labels.CHANGE_DEST_ACCOUNT'),
      payload: transactionId
    },
      ctx => ctx.reply(`Aloha! transactionId is ${ctx.match}`)
    )
    .row()
    .text({
      text: ctx => ctx.i18n.t('labels.CHANGE_DESCRIPTION'),
      payload: transactionId
    },
      ctx => ctx.reply(`Aloha! transactionId is ${ctx.match}`)
    )
    // TODO: Add functionality to change the date of a transaction
    // Try this repo: https://github.com/daniharo/grammy-calendar
    // .text(ctx.i18n.t('labels.CHANGE_DATE'), editTransactionsMapper.editDate.template({trId}))
    .text({
      text: ctx => ctx.i18n.t('labels.CHANGE_AMOUNT'),
      payload: transactionId
    },
      ctx => ctx.reply(`${ctx.session.newTransaction.id}`)
    )
    .row()
    .url(ctx.i18n.t('labels.OPEN_IN_BROWSER'), `${fireflyUrl}/transactions/show/${transactionId}`)
    .row()
    .text({ text: ctx => ctx.i18n.t('labels.DELETE'), payload: transactionId }, deleteTransactionMiddleware)
    .text({ text: '🔙', payload: transactionId }, closeEditTransactionMenu).row()
}

function createEditCategoryMenu() {
  return new Menu<MyContext>(MENUS.EDIT_TRANSACTION__EDIT_CATEGORY)
    .dynamic(createCategoriesRange(editTransactionSelectCategoryHandler))
}

async function closeEditTransactionMenu(ctx: MyContext) {
  const log = rootLog.extend('closeEditTransactionMenu')
  try {
    const userSettings = ctx.session.userSettings
    const trId = ctx.match
    if (typeof trId !== 'string') throw new Error('No transactionId supplied!')
    log('transaction id: %O', trId)

    const tr = (await firefly(userSettings).Transactions.getTransaction(trId)).data.data
    ctx.session.currentTransaction = tr

    const index = ctx.session.editTransactions.findIndex(t => t.id === trId)
    ctx.session.editTransactions.splice(index, 1)

    return ctx.editMessageText(
      formatTransaction(ctx, tr),
      {
        parse_mode: 'Markdown',
        reply_markup: transactionMenu
      }
    )
  } catch (err) {
    log('Error: %O', err)
    console.error('Error occured cancelling edit transaction: ', err)
    throw err
  }
}

async function deleteTransactionMiddleware(ctx: MyContext) {
  const log = rootLog.extend('deleteTransactionMiddleware')
  log('Entered deleteTransaction middleware')
  try {
    const trId = ctx.match
    if (typeof trId !== 'string') throw new Error('No transactionId supplied!')
    log('transaction id: %O', trId)

    await firefly(ctx.session.userSettings).Transactions.deleteTransaction(trId)

    return ctx.deleteMessage()
  } catch (err) {
    console.error(err)
    return ctx.reply(
      ctx.i18n.t('transactions.add.couldNotDelete', { id: ctx.match })
    )
  }
}

async function newTransactionSelectCategoryHandler(ctx: MyContext) {
  const log = rootLog.extend('newTransactionSelectCategoryHandler')
  try {
    const categoryId = ctx.match
    log('categoryId: %s', categoryId)
    if (typeof categoryId !== 'string') throw new Error('No categoryId supplied!')
    ctx.session.newTransaction.categoryId = categoryId
    ctx.session.newTransaction.type = TransactionTypeProperty.Withdrawal
    log('Setting new category id: %s', categoryId)

    const tr = await createFireflyTransaction(ctx)
    log('Got new transaction created: %O', tr.id)

    ctx.session.currentTransaction = tr

    return ctx.editMessageText(
      formatTransaction(ctx, tr),
      {
        parse_mode: 'Markdown',
        reply_markup: transactionMenu
      }
    )
  } catch (err) {
    console.error(err)
    log('Error occured handling category selection: %O', err)
    return ctx.reply((err as Error).toString())
  }
}

async function editTransactionSelectCategoryHandler(ctx: MyContext) {
  const log = rootLog.extend('editTransactionSelectCategoryHandler')
  try {
    const categoryId = ctx.match
    log('categoryId: %s', categoryId)
    if (typeof categoryId !== 'string') throw new Error('No categoryId supplied!')

    // const tr = (await firefly(userSettings).Transactions.getTransaction(trId)).data.data
    // log('Setting new category id: %s', c.id)

    // const update = {
    //   transactions: [{
    //     source_id: tr.attributes?.transactions[0].source_id,
    //     destination_id: tr.attributes?.transactions[0].destination_id,
    //     category_id: c.id
    //   }]
    // }
    // log('Transaction update: %O', update)

    // const updatedTr = (await firefly(userSettings).Transactions.updateTransaction(tr.id, update)).data.data
    // ctx.session.editTransaction = updatedTr
    //
    // ctx.session.editTransaction.attributes!.transactions[0].category_id = c.id

    // ctx.session.newTransaction.categoryId = categoryId
    // ctx.session.newTransaction.type = TransactionTypeProperty.Withdrawal
    // log('Setting new category id: %s', categoryId)
    //
    // const tr = await createFireflyTransaction(ctx)
    // log('Got new transaction created: %O', tr.id)
    //
    // ctx.session.newTransaction.id = tr.id
    //
    // return ctx.editMessageText(
    //   formatTransaction(ctx, tr),
    //   {
    //     parse_mode: 'Markdown',
    //     reply_markup: transactionMenu
    //   }
    // )
  } catch (err) {
    console.error(err)
    log('Error occured handling category selection: %O', err)
    return ctx.reply((err as Error).toString())
  }
}
