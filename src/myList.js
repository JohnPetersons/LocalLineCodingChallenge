/*
* Local Line Coding Challenge
* File: myList.js
* Author: John Petersons
*
* Contains the MyList class which can be used to show different types of lists.
*/

import React from 'react';
import PropTypes from 'prop-types';

/*
* MyList
*
* Description:
* Takes in a a name for the list, a number of items per page, a function for generating the list items, an update function
* and (optional) a list of items.  It produces a list of the items passed or, if no items are passed, a "Loading..." message.
* the updateFunc passed is called once the MyList is successfully rendered.
* listItemFunc and updateFunc are parameters so that MyList is more generic and can be used for different types of potential lists.
* Items are turned into <li>...</li> by listItemFunc and render() figures out which ones to show.  Avoids creating new list items 
* except when the items are updated.
*
* Parameters:
* name: String
* items: Array(Objects) // Optional
* itemsPerPage: integer
* listItemFunc: function(Object, function(Object)) that returns <li>...</li>
* updateFunc: function(Array(Objects))
*
* Functions:
* updateItems(newItems: Array(Objects))
* componentDidMount()
* changePage(i: integer)
* previousPage()
* nextPage()
* removeFromList(item: Object)
* render()
*/
class MyList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: this.props.items != null? this.props.items.map((item) => this.props.listItemFunc(item, this.removeFromList)): [],
			itemsPerPage: this.props.itemsPerPage,
			pageNumber: 1,
			lastPage: this.props.items != null? (this.props.itemsPerPage >= this.props.items.length): true
		};
	}

/*
* updateItems(newItems)
*
* Description:
* Updates the item list and generates a <li>...</li> for each item using this.props.listItemfunc(Object, function(Object))
*
* Parameters:
* newItems: Array(Objects)
*/
	updateItems(newItems) {
		if (newItems == null)
			newItems = [];
		for (var i = 0; i < newItems.length; i++){
			newItems[i].key = i;
		}
		this.setState((prev, props) => ({
			items: newItems.map((item) => props.listItemFunc(item, this.removeFromList)),
			lastPage: (prev.itemsPerPage >= newItems.length)
		}));
	}

	componentDidMount() {
		this.props.updateFunc(this);
	}
/*
* changePage(i)
*
* Description:
* Changes the page number without going below 1 and determining if the new page is the last page or not.
*
* Parameters:
* i: integer
*/
	changePage(i) {
		this.setState((prev) => ({
			pageNumber: Math.max(1, i),
			lastPage: (i * prev.itemsPerPage >= prev.items.length)
		}));
	}

	previousPage = () => {
		this.changePage(this.state.pageNumber - 1);
	} 

	nextPage = () => {
		this.changePage(this.state.pageNumber + 1);
	}

/*
* removeFromList(item)
*
* Description:
* Removes an item from the list using setState and then lets render() show the new list.
* Also shifts the page back one if the page no longer has any items on it.
*
* Parameters:
* item: Object
*/
	removeFromList = (item) => {
		this.setState((prev) => ({
			items: prev.items.filter((i) => i.props.item !== item.props.item),
			pageNumber: ((prev.pageNumber - 1) * prev.itemsPerPage >= prev.items.length - 1)? 
				Math.max(1, prev.pageNumber - 1) : prev.pageNumber,
			lastPage: (prev.pageNumber * prev.itemsPerPage >= prev.items.length - 1)
		}));
	}

	render() {
		const {
			items,
			pageNumber,
			itemsPerPage,
			lastPage
		} = this.state;
		return (
			<ul className="myList">
				<li><div className="flex autoMargin"><h1>{this.props.name}</h1></div></li>
				{items.length === 0?
					<li><div className="flex center autoMargin">Loading...</div></li>:
					items.slice(Math.max(0, (pageNumber - 1) * itemsPerPage), 
					Math.max(itemsPerPage, pageNumber * itemsPerPage))}
				<li><div className="flex"></div>
					<div className="autoMargin">
						<button className="pageButton" disabled={pageNumber === 1} onClick={ this.previousPage }>&lt;</button>
						<input className="pageNumber" type="number" readOnly value={pageNumber}/>
						<button className="pageButton" disabled={lastPage} onClick={ this.nextPage }>&gt;</button>
					</div>
				</li>
			</ul>
		);
	}
}

MyList.propTypes = {
	itemsPerPage: PropTypes.number,
	listItemFunc: PropTypes.func,
	updateFunc: PropTypes.func,
	name: PropTypes.string
};
export {MyList};
