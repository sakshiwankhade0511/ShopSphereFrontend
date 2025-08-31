import React from 'react'
import Table from '../Common/Table'
import "./MyOrderPage.css"
import UseData from '../../hooks/UseData'

const MyOrderPage = () => {
  const {data: orders, errors, isloading} = UseData("/order", null, ["myorders"], 1*60*1000);

  const getProductString = order => {
    const productStringArr = order.products.map(p => 
      `${p.product.title} (${p.quantity})`
    )

    return productStringArr.join(", ")
  }
  return (
    <div className="align_center myOrderPage">
        {errors && <p className='formErrors'>{errors}</p>}
        {orders && <Table headings={["Order", "Products", "Total", "Status"]}>
            <tbody>
              {orders.map((order, index) => 
                <tr key={order._id}>
                    <td>{index + 1}</td>
                    <td>{getProductString(order)}</td>
                    <td>${order.total}</td>
                    <td>{order.status}</td>
                </tr>
              )}
                
            </tbody>
        </Table>}
    </div>
  )
}

export default MyOrderPage