class Node {
    constructor(value){
     this.left  = null
     this.right = null
     this.color =  "red"
     this.value = value
     this.parent = null 
    }
    print(){
        console.log(this.value,this.color)
    }
    }
class RedBlackTree {
    constructor(value){
        this.root = new Node(value)
        this.root.color = "black"
        this.size = 0
    }
    insert(input){
        var node = new Node(input)
        let tempNode = this.root

    
    
        while(tempNode!==null){

            // go left
            if(input<tempNode.value )
            {
                if(tempNode.left===null){
                    node.parent=tempNode
                    tempNode.left=node
                    break;
                }
                else{
                    tempNode=tempNode.left
                }
            }

            // go right
            else if (input>tempNode.value){
                if(tempNode.right===null){
                    node.parent=tempNode
                    tempNode.right=node
                    break;
                }
                else{
                    tempNode=tempNode.right
                }
            }

            // duplicate
            else{
                return;
            }

        } // end of while


    this.checkParentColor(node)


    } // end of function --> insert 
    checkParentColor(node)
    {
        // increase size of tree each time an insertion occurs
        this.size++
        if(node.parent.color==="black"){
            return;
        }
        // this means parent is red so i need to restructure the tree by either changing color or rotation
        else {
            this.restructure(node)
        }
    } // end of function --> chackParentColor
    restructure(node){

        let parent = node.parent
        let grandparent = parent.parent
        let uncle

        // get the uncle
        // check position of parent if it's on the right then my uncle is on the left 
        if (grandparent.right===parent){
             uncle = grandparent.left
        }
        // check position of parent if it's on the left then my uncle is on the right 
        else{
             uncle = grandparent.right
        }


        // rotate if uncle is black 
        if(uncle===null || uncle.color==="black" ){
           this.checkRotationCase(parent,uncle,grandparent,node)   
        }
        // recolor if uncle is red 
        else{
            this.recolor(parent,uncle,grandparent)
        }
    }// end of function --> restructure
    recolor (parent,uncle,grandparent){
        parent.color="black"
        uncle.color="black"
        grandparent.color="red"

        // if grandparent is the root recolor it to black
        if(grandparent===this.root){
            grandparent.color="black"
        }

        // if grandparent is not the root restructure where i will recheck the color of the father 
        // and if it's red i will check color of uncle if uncle is red i will recolor if uncle is black i will rotate
        else{
            // note this means that the grandparent has a grandparent bec if his parent is root
            // then his parent would have a black color
            this.checkParentColor(grandparent)
        }
    } // end of function -->recolor
    checkRotationCase(parent,uncle,grandparent,node){

        // left
        if(grandparent.left===parent){
            // left left case
            if(parent.left===node){
              this.leftLeftRotationCase(parent,grandparent)
            }
            // left right case
            else{
              this.leftRightRotationCase(parent,grandparent,node)
            }
        }
        //right
        else{
            // right right case
            if(parent.right===node){
                this.rightRightRotationCase(parent,grandparent)
            }
            // right left case
            else{
                this.rightLeftRotationCase(parent,grandparent,node)
            }
    
        }
    } // end of function checkRotationCase
    leftLeftRotationCase(parent,grandparent){
        // update only if grandparent was the root else then the root shouldnt change its place
        if(grandparent.parent===null)
        this.root=parent
    
        let grandgrandparent = grandparent.parent
    //////////////////////GRAND Parent HANDELING///////////////////
        grandparent.color="red"
        grandparent.parent=parent  // not yet
        grandparent.left=parent.right; // done both ways
        if(parent.right!==null)
        parent.right.parent=grandparent
        grandparent.left=grandparent.left; // done
        // since grandparent became red i need to check it's father's color
     
       
    ///////////////////////////PARENT HANDELING//////////////////////////////////////
        parent.color="black"
        parent.left = parent.left  // done
        parent.right=grandparent  //done 
        parent.parent=grandgrandparent // ok
        if(grandgrandparent!==null){
            if(grandgrandparent.right===grandparent)
            grandgrandparent.right = parent
            else
            grandgrandparent.left = parent
        }

        //this.checkParentColor(grandparent)
    }// end of leftLeftCase.
    leftRightRotationCase(parent,grandparent,node){
        /////////////////// parent
        parent.parent=node
        //parent.color="re"
        parent.left=parent.left // done
        parent.right=node.left

        if(node.left!==null)
        node.left.parent=parent
    
        //////////////////// node 
        node.parent=grandparent
        node.right = node.right // done
        node.left=parent // done
        //node.color ="red"
        
        if(grandparent.left===parent)
        grandparent.left=node
        else
        grandparent.right=node
    
     
        // note i gave them node as the new parent and parent as the new node 
       this.leftLeftRotationCase(node,grandparent)
    }// end of left right rotation case
    rightRightRotationCase(parent,grandparent){
        // update only if grandparent was the root else then the root shouldnt change its place
        if(grandparent.parent==null)
        this.root=parent
    
        let grandgrandparent = grandparent.parent
    //////////////////////GRAND Parent HANDELING///////////////////
        grandparent.color="red"
        grandparent.parent=parent  // not yet
        grandparent.right=parent.left; // done both ways
        if(parent.left!==null)
        parent.left.parent=grandparent
        grandparent.left=grandparent.left; // done
        // since grandparent became red i need to check it's father's color

   

    ///////////////////////////PARENT HANDELING//////////////////////////////////////
        parent.color="black"
        parent.right = parent.right  // done
        parent.left=grandparent  //done 
        parent.parent=grandgrandparent
        if(grandgrandparent!==null){
            if(grandgrandparent.right===grandparent)
            grandgrandparent.right = parent
            else
            grandgrandparent.left = parent
        }

        
      //  this.checkParentColor(grandparent)
    } // end of Right right case
    rightLeftRotationCase(parent,grandparent,node){
       /////////////////// parent
       parent.parent=node
       //parent.color="re"
       parent.left=node.right // done
       parent.right=parent.right

       if(node.right!==null)
       node.right.parent=parent
   
    //////////////////// node 
       node.parent=grandparent
       node.right = parent // done
       node.left=node.left // done
       //node.color ="red"
    
       if(grandparent.left===parent)
       grandparent.left=node
       else
       grandparent.right=node
   
    
       // note i gave them node as the new parent and parent as the new node 
      this.rightRightRotationCase(node,grandparent)

    } // end of right left rotation case
    search(input){
        let tempNode = this.root
    
        while(tempNode!==null){
            if(input===tempNode.value){
                return tempNode
            }
            else if (input<tempNode.value){
                tempNode=tempNode.left
            }
            else {
                tempNode=tempNode.right
            }
        }
        return null;
    }
    printTreeHeight(node){
        if(node==null){
            let output = [] ;
            return output
        }
        let right = this.printTreeHeight(node.right)
        let left = this.printTreeHeight(node.left)
        if(right.length<left.length){
            left.push(node.value)
        }
        else{
            right.push(node.value)
        }
        return (left.length > right.length ? left:right); 
    }
}







const tree = new RedBlackTree(1);
tree.insert(1)
tree.insert(2)
tree.insert(3)
tree.insert(4)
tree.insert(5)
tree.insert(6)
tree.insert(7)
tree.insert(8)
tree.insert(9)
tree.insert(10)
tree.insert(11)
tree.insert(12)
tree.insert(13)
tree.insert(14)


console.log(tree.printTreeHeight(tree.root).length)
tree.search(5).print()

tree.root.print()
tree.root.left.print()
tree.root.left.left.print()
tree.root.left.right.print()
tree.root.right.print()
tree.root.right.left.print()
tree.root.right.right.print()
tree.root.right.right.left.print()
tree.root.right.right.right.print()
tree.root.right.right.right.right.print()
tree.root.right.right.right.right.right.print()
