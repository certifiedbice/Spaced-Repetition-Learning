class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
	constructor() {
		this.head = null;
	}
	insertFirst(item,next) {
		// More supplemental code
		// console.log('\n**** insert first ****\n')
		// console.log(next)

		// if(next!==undefined){this.head = new _Node(item, next);}
		// else{this.head = new _Node(item, this.head);}

		//original code
		this.head = new _Node(item, this.head);
	}
	insertLast(item,next) {
		if (this.head === null) {
			this.insertFirst(item,next);
		} else {
			let tempNode = this.head;
			while (tempNode.next !== null) {
        		tempNode = tempNode.next;
      		}
	  		// new code block for inserting last with an existing head
	  		// this is supplemental for the move function
			//   console.log('nextnextnextnextnextnextnext')
			// if(next!==undefined){tempNode.next = new _Node(item, next);}
			// else{tempNode.next = new _Node(item, null);}


			// original code, uncomment and comment the above supplemental to return to the original functionality
			tempNode.next = new _Node(item, null);
    }
	}
	find(item) {
		// Start at the head
		let currNode = this.head;
		// If the list is empty
		if (!this.head) {
			return null;
		}
		// Check for the item
		while (currNode.value !== item) {
			/* Return null if it's the end of the list 
			and the item is not on the list */
			if (currNode.next === null) {
				return null;
			} else {
				// Otherwise, keep looking
				currNode = currNode.next;
			}
		}
		// Found it
		return currNode;
	}
	remove(item) {
		// If the list is empty
		if (!this.head) {
		return null;
		}
		// If the node to be removed is head, make the next node head
		if (this.head.value === item) {
		this.head = this.head.next;
		return;
		}
		// Start at the head
		let currNode = this.head;
		// Keep track of previous
		let previousNode = this.head;
		while (currNode !== null && currNode.value !== item) {
		// Save the previous node
		previousNode = currNode;
		currNode = currNode.next;
		}
		if (currNode === null) {
		console.log('Item not found');
		return;
		}
		previousNode.next = currNode.next;
	}
	display() {
		const arr = [];
		let currentNode = this.head;
		do {
		arr.push(currentNode.value);
		currentNode = currentNode.next;
		} while (currentNode.next !== null);
		arr.push(currentNode.value);
		return arr;
	}
	move(n) {
		// store the original head
		let tmpHead=this.head
		let nodeStorage=new Array();
		for(let i=0;i<=n;i++){
			// console.log('\n&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& START ITERATION\n')
	 		// console.log('ITERATION: ',i,'\n')
			
			// Only make the changes on the last iteration.
			if(i===n){
				// console.log('FINAL ITERATION\n')

				// console.log('this.head=\n')

				console.log(this.head)

				// store this.head.next 
				// console.log('tmpNext=this.head\n')
				let tmpNext=this.head.next

				// set head.next to the original head 
				// console.log('this.head.next=tmpHead\n')
				this.head.next=tmpHead;

				// set the head.value.next to the new head.next.value.id
				this.head.value.next=this.head.next.value.id

				// set the head.next.next to the store head.next/tmpNext
				this.head.next.next=tmpNext;

				// set the head.next.value.next to the new head.next.next.value.id
				// console.log(this.head)
				// console.log(this.head.next.value.next)
				if(this.head.next.next!==null){
					console.log(this.head.next.next.value.id)
					this.head.next.value.next=this.head.next.next.value.id
				}
				else{this.head.next.value.next=null}

				// console.log('\n&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& END ITERATION\n')

				while(nodeStorage.length!==0){
					this.insertFirst(nodeStorage.pop().value);
				}
				break;
			}
			if(i!==0)nodeStorage.push(this.head)
			// console.log(nodeStorage)
			this.head=this.head.next
			// console.log('\n&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& END ITERATION\n')
		}
	}
}

module.exports = LinkedList;
