import React from 'react'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arr:[
        { id:1,
          name:'Handbag',
          price: 20000,
          netprice:20000,
          image:require ('./component/images/Handbag.jpg'),
          quantity:1,
          netquantity:1
        },
        { id:2,
          name:'Lens',
          price: 5000,
          netprice:5000,
          image:require ('./component/images/lens.jpg'),
          quantity:1,
          netquantity:1
        },
        { id:3,
          name:'Shoes',
          price: 15500,
          netprice:15500,
          image:require ('./component/images/shoes.jpg'),
          quantity:1,
          netquantity:1
        },
      ],
      user:[],
      items:null,
      amount: null
    };  
  }
  
  handleAdd =(index,id)=>{
    let user= [...this.state.user]
    const isFound = user.some(
      element=>{
        if (element.id === id)
          return true;
        else
          return false
      }
    )
    if (isFound)
    {
      index = user.findIndex(index =>index.id ===id)
      this.handlequantity(index,true)
    }
    else
    {
      user.push(this.state.arr[index])
    }
    const items = this.totalItem(user)
    const amount = this.totalAmount(user)
    console.log("first item",items)
    this.setState({
      user,
      items:items,
      amount:amount
    },()=>console.log(user))
    
  }

  handlequantity=(index,add)=>{
    let user= [...this.state.user]
    console.log("Inside cart ---->",index,add)
    if (add && user[index].netquantity>=1 )
    {
      user[index].netquantity+=1
      user[index].netprice = (user[index].netquantity)*(user[index].price)
    }
    else if(!add && user[index].netquantity>1) 
    {
      user[index].netquantity-=1
      user[index].netprice = (user[index].netquantity)*(user[index].price)
    }
    else if(!add && user[index].netquantity==1) 
    {
      user.splice(index,1)
    }
    
    const items = this.totalItem(user)
    const amount = this.totalAmount(user)
    this.setState({
          user,
          items:items,
          amount:amount
        },()=>console.log(user))
    }

  totalItem=(user)=>{ 
    var total= 0
    user.forEach(element => {  
      total = total + element.netquantity;
    });
    return total
  }
  totalAmount=(user)=>{ 
    var totalamount= 0
    user.forEach(element => {  
      totalamount += element.netprice;
    });
    return totalamount
  }

  render(){
    return(
      <div className='App'>
        <h1>SHOPIFY</h1>
      {this.state.arr.map((ele,index)=>{
        return (
        <div >
          <div class="img-container">
          <img src={ele.image} alt=''/>
          <h5>{ele.name} <br/>Rs. {ele.price}</h5>
          <button onClick={()=>{this.handleAdd(index,ele.id)}}>Add to cart</button> 
          </div>
        </div>
        )
      })
      }
      
      <table>
            <thead>
              <tr>
                <td> Item Name </td>
                <td> quantity </td>
                <td> Price per item (INR) </td>
                <td> Action </td>
                <td> Total </td>
              </tr>
            </thead>
            <tbody>
            {this.state.user.length?this.state.user.map((ele,index)=>{
              return( 
                <>
              <tr key={index}>
                <td>{ele.name}</td>
                <td>{ele.netquantity}</td>
                <td>Rs. {ele.price}</td>
                <td>
                <button onClick={()=>{this.handlequantity(index,true)}}>+</button> &nbsp;
                <button>{ele.netquantity}</button>&nbsp;
                <button onClick={()=>{this.handlequantity(index,false)}}>-</button>
                </td>
                <td>Rs. {ele.netprice}</td>
                
              </tr>
                       
              </>
            )}
            )  
            :<tr> <td colSpan="5">No purchase yet.Start Shopping!</td> </tr>
             } 
        
         <tr><b> Total Items:</b><td colSpan="4">{this.state.items}</td></tr>
         <tr><b> Total Amount: </b><td colSpan="4">Rs. {this.state.amount}</td> </tr>
        </tbody>
        </table>
        
      </div>
      
    )
  }
}

export default App

