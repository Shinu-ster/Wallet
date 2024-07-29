import '../styles/Balance.css'

export default function Balance(balance) {
  const totalIncome = balance.balance.transactions
  .filter(transaction => transaction.transaction_type === "income")
  .reduce((acc, transaction) => acc + transaction.amount, 0);

const totalExpense = balance.balance.transactions
  .filter(transaction => transaction.transaction_type === "expense")
  .reduce((acc, transaction) => acc + transaction.amount, 0);

  return (
    <>
 {    console.log(balance.balance.data.balance)}
 {console.log("Total income", totalIncome)}
 {console.log("total expense",totalExpense)}

      <div className="container">
        <div className="income">
          <h1 className='title_income'>Income</h1>
          <h2 className="income_balance">${totalIncome}</h2>
        </div>
        <div className="total">
        <h1 className='title_total'>Total</h1>
          <h2 className="total_balance">${balance.balance.data.balance}</h2>
        
        </div>
        <div className="expense">
        <h1 className='title_expense'>Expense</h1>
          <h2 className="expense_balance">${totalExpense}</h2>
        </div>
      </div>
    </>
  )
}
