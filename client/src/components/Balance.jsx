import '../styles/Balance.css';
import  { memo } from 'react';
import PropTypes from 'prop-types';

const Balance = memo(({ balance }) => {
  if (!balance || !balance|| !balance.transactions || !balance.data) {
    return <div>No balance data available {console.log("Balance props",balance)}</div>;
  }

  const transactions = balance.transactions;
  const dataBalance = balance.data.balance;

  const totalIncome = transactions
    .filter(transaction => transaction.transaction_type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpense = transactions
    .filter(transaction => transaction.transaction_type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  return (
    <>
      <div className="container">
        <div className="income">
          <h1 className='title_income'>Income</h1>
          <h2 className="income_balance">${totalIncome}</h2>
        </div>
        <div className="total">
          <h1 className='title_total'>Total</h1>
          <h2 className="total_balance">${dataBalance}</h2>
        </div>
        <div className="expense">
          <h1 className='title_expense'>Expense</h1>
          <h2 className="expense_balance">${totalExpense}</h2>
        </div>
      </div>
    </>
  );
});

Balance.displayName = "Balance";

Balance.propTypes = {

    balance: PropTypes.shape({
      data: PropTypes.shape({
        balance: PropTypes.number.isRequired,
        _id:PropTypes.string.isRequired,
      }).isRequired,
      transactions: PropTypes.arrayOf(
        PropTypes.shape({
          transaction_type: PropTypes.string.isRequired,
          amount: PropTypes.number.isRequired,
        })
      ).isRequired,
    }).isRequired
};

export default Balance;
