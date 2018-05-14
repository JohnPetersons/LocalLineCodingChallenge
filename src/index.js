/*
* Local Line Coding Challenge
* File: index.js
* Author: John Petersons
*
* A site that loads a list of businesses into a list.
* Made with React.
*/

import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import { MyList } from './myList';
import { BusinessListItem } from './businessListItem';

/*
* Page
*
* Description:
* Generates the page, which currently only shows one MyList displaying businesses.
* itemsPerPage is set at 4 because that was the number of items visible in the screenshot.
*
* Parameters:
* data: Array(Object) // Optional
*
* Functions:
* render()
*/
class Page extends React.Component {

/*
* render()
*
* Description:
* Renders the page.
* The function passed to the MyList as updateFunc contains the coding challenge requirement of using the Promise given by 
* the APICall function to the populate the data.
*/
	render() {
		return <MyList name="My Customers" items={this.props.data} itemsPerPage={4} 
			listItemFunc={(item, removeFromList) => { return <BusinessListItem  key={item.key} item={item} remove={removeFromList}/>;}}
			updateFunc={(myList) => {
				import("./util").then((util) => 
					util.APICall().then((res) => myList.updateItems(res)))
			}}
		/>;
	}
}

ReactDOM.render(
	<Page/>,
	document.getElementById("root")
);
