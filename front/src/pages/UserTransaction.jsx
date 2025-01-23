import {useEffect,UseState} from 'react'
import {Link,useLocation,useNavigate} from 'react-router'
import { useSelector } from "react-redux"


import '@styles/pages/_UserTransaction.scss'


const UserTransaction = () => {

 const token = useSelector(state => state.auth?.token);

const user = useSelector(state => state.user?.userCredits);

 const navigate = useNavigate();

 console.log(user);


  useEffect(() => {

    if(!token){
      navigate('/signin');
    }

  }, [token]);


  return (
  <>
    <div className="transaction-content-header" data-user={user.id}>
        <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
        <p className="account-amount">$184.30</p>
        <p className="account-amount-description">Current Balance</p>
    </div>
    <div className="transaction-content-table">

      <div className="row row-header">
        <div className="date">Date</div>
        <div className="description">Description</div>
        <div className="amount">Amount</div>
        <div className="balance">Balance</div>
      </div>

      <div className="row row-datas" data-id="0484848484">
        <div className="date">Sep 22</div>
        <div className="description">Mortgage Payment</div>
        <div className="amount">-$1,000.00</div>
        <div className="balance">-$1,000.00</div>
      </div>

      <div className="row row-datas" data-id="1234567890">
        <div className="date">Oct 15</div>
        <div className="description">Utility Bill</div>
        <div className="amount">-$200.00</div>
        <div className="balance">-$1,200.00</div>
      </div>

      <div className="row row-datas" data-id="9876543210">
          <div className="date">Nov 5</div>
          <div className="description">Grocery Shopping</div>
          <div className="amount">-$50.00</div>
          <div className="balance">-$1,250.00</div>
      </div>

      <div className="row row-datas" data-id="5555555555">
          <div className="date">Dec 10</div>
          <div className="description">Internet Bill</div>
          <div className="amount">-$80.00</div>
          <div className="balance">-$1,330.00</div>
      </div>

      <div className="row row-datas" data-id="7777777777">
          <div className="date">Jan 3</div>
          <div className="description">Gas Refill</div>
          <div className="amount">-$30.00</div>
          <div className="balance">-$1,360.00</div>
          <div className="options">
          <i className="fa pencil"></i>
            <div className="transac">Transaction Type: Electronic
            </div>
            <div className="category">Category : Food <i className="fa fa-pencil"></i></div>
            <div className="notes">Notes : <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam iste repellat rerum aut, nam magni.
            <i className="fa fa-pencil"></i></p>
            </div>
          </div>
      </div>


    </div>
    
  
  
  </>)

}
export default UserTransaction