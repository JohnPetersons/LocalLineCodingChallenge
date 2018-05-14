/*
* Local Line Coding Challenge
* File: businessListItem.js
* Author: John Petersons
*
* Contains the BusinessListItem, and BusinessPopup classes.
* Are used as part of a MyList for displaying businesses and their data.
*/

import React from 'react';
import PropTypes from 'prop-types';

/*
* BusinessListItem
*
* Description:
* Contains the button to remove itself from the MyList, the BusinessPopup associated with the BusinessListItem, 
* and the button to view the popup.
* The button to remove itself calls the remove function passed to it by the MyList.
*
* Parameters:
* item: Object
* remove: function(Object)
*
* Functions:
* showPopup()
* closePopup()
* removeThis()
* render()
*/
class BusinessListItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			popup: "hiddenPopup"
		};
	}

	showPopup = () => {
		this.setState({
			popup: "visiblePopup"
		});
	}
	closePopup = () => {
		this.setState({
			popup: "hiddenPopup"
		});
	}

	removeThis = () => {
		this.props.remove(this);
	}
/*
* render()
*
* The svg tag displays a circle missing an X in the middle.
*/
	render = () => {
		const {
			business_name,
			city,
			province
		} = this.props.item;
		return (
			<li>
				<div className="flex autoMargin">
					<h2>{business_name}</h2>
					<p>{city}, {province}</p>
				</div>
				<div className="center autoMargin">
					<button className="view" onClick={ this.showPopup }>View</button>
					<button className="remove" onClick={ this.removeThis }>
						<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
							<path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" fill="#646464"/>
							<path d="M0 0h24v24H0z" fill="none"/>
						</svg>
					</button>
					<BusinessPopup title={business_name} item={this.props.item} popup={this.state.popup} close={ this.closePopup }/>
				</div>
			</li>
		);
	}
}

BusinessListItem.propTypes = {
	item: PropTypes.shape({
		business_name: PropTypes.string,
		province: PropTypes.string,
		city: PropTypes.string,
		country: PropTypes.string,
		customer_info: PropTypes.shape({
			last_deliver_date: PropTypes.string,
			orders_this_month: PropTypes.number,
			buyer_average_order: PropTypes.number
		})
	}),
	remove: PropTypes.func
};

/*
* BusinessPopup
*
* Description:
* A popup that appears when the user presses the "View" button from the BusinessListItem.  Can be closed by pressing the "X" button
* or by clicking off of the popup.
*
* Parameters:
* item: Object
* close: function()
*
* Functions:
* closePopup()
* render()
*/
class BusinessPopup extends React.Component {	
	closePopup = () => {
		this.props.close();
	}

/*
* render()
*
* Some of the options that were visible in the screenshots did not have corresponding data from the customers JSON object in util.js
* which has resulted in a few guesses as to what the names would be.  These fields have been marked with a placeholder comment.
* The svg tag displays an X.
* The buttons "Send Catalog" and "Add Note" currently do nothing.
*/	
	render() {
		const {
			business_name,
			city,
			province,
			phone,
			catalog,
			customer_info
		} = this.props.item;
		const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		return (
			<div className={this.props.popup}>
				<div className="darken" onClick={ this.closePopup }></div>
				<div className="popup autoMargin">
					<table className="popupTable"><tbody>
						<tr>
							<td>
								<h3>{ business_name }</h3>
							</td>
							<td>
								<div className="close autoMargin">
									<button className="close" onClick={ this.closePopup }>
										<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
											<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="#516fb7"/>
											<path d="M0 0h24v24H0z" fill="none"/>
										</svg>
									</button>
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<p>Location</p>
								<p>{city}, {province}</p>
							</td>
							<td>
								<p>Phone</p>
								<p>{phone?phone:"N/A"}</p>
							</td>
						</tr>
						<tr>
							<td>
								<p>Product Catalog</p>
								<select>
									<option value="">Select a Catalog</option>
									{/* placeholder */}
									{catalog? catalog.map((option) => <option value={option}>{option}</option>):null}
								</select>
							</td>
							<td>
								<p>Last Delivery</p>
								<p>{customer_info.last_delivery_date? (new Date(customer_info.last_delivery_date)).toDateString(): "N/A"}</p>
							</td>
						</tr>
						<tr>
							<td>
								<button className="catalog">Send Catalog</button>
							</td>
							<td>
								<button className="note">Add Note</button>
							</td>
						</tr>
						<tr>
							<td>
								<p>Average Order</p>
								<p>{customer_info.buyer_average_order? "$" + customer_info.buyer_average_order.toFixed(2): "$0.00"}</p>
							</td>
							<td>
								<p>{months[(new Date(Date.now())).getMonth()]} Orders</p>
								<p>{customer_info.orders_this_month? customer_info.orders_this_month: "0"}</p>
							</td>
						</tr>
						<tr>
							<td>
								<p>{months[(new Date(Date.now())).getMonth()]} Sales</p>
								{/* placeholder */}
								<p>{customer_info.sales_this_month? "$" + customer_info.sales_this_month.toFixed(2): "$0.00"}</p>
							</td>
							<td>
								<p>Total Sales</p>
								{/* placeholder */}
								<p>{customer_info.sales_total? "$" + customer_info.sales_total.toFixed(2): customer_info.sales_this_month? "$" + customer_info.sales_this_month.toFixed(2): "$0.00"}</p>
							</td>
						</tr>
					</tbody></table>
				</div>
			</div>
		);
	}
}

export { BusinessListItem };
