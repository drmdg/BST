let a = [1,2,3,4,5,6,7,8,9,10,11];



function Node(data){
    return {
        data:data,
        left:null,
        right:null
    }
}

function buildTree(array,start,end){
    array.sort( (a,b) =>{   return a-b;}  );

    if (start>end){
        return null;
    }
    let mid= parseInt((start+end)/2);
    let root = Node(array[mid]);
    root.left=buildTree(array,start,mid-1);
    root.right=buildTree(array,mid+1,end);
    return root;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

function insertTree(root,key){
    if (root==null ){
        root=Node(key);
        return root;
    }

    if(key<root.data){
        root.left=insertTree(root.left,key);
    }else if (key>root.data){
        root.right=insertTree(root.right,key);
    }
    return root;
}

function deleteNode(root,key){
    if(root==null){
        return root;
    }

    if(root.data>key){
        root.left=deleteNode(root.left,key);
        return root;
    }else if (root.data<key){
        root.right=deleteNode(root.right,key);
        return root;
    }


    if (root.left == null) {
        let temp = root.right;
        delete root;
        return temp;
    }
    else if (root.right == null) {
        let temp = root.left;
        delete root;
        return temp;
    }else{

        let succparent= root;
        let succ=root.right;
        while(succ.left!=null){
            succparent=succ;
            succ=succ.left;
        }


        if (succparent != root)
        succparent.left = succ.right;
    else
        succparent.right = succ.right;

    // Copy Successor Data to root
    root.data = succ.data;

    // Delete Successor and return root
    delete succ;
    return root;
    }

}

function find(root,key){

    if(root.data==key){
        return root;
    }
    if(key<root.data){
        root=find(root.left,key);
        return root;
    }else{
        root=find(root.right,key);
        return root;
    }
}

function levelOrder(root){
    let result=[];
    let fila=[];
    let aux;

    fila.push(root);
    while(fila.length>0){
        aux=fila.shift();
        if(aux.left!=null){
            fila.push(aux.left);
        }if(aux.right!=null){
            fila.push(aux.right);
        }
        result.push(aux.data);
    }
    return result;
}
function inOrder(root,aux=[]){
   
    if(root!=null){
        inOrder(root.left,aux);
        aux.push(root.data);
        inOrder(root.right,aux);
    }
    return aux;
}

function preOrder(root,aux=[]){
    
    if(root!=null){
        aux.push(root.data);
        preOrder(root.left,aux);  
        preOrder(root.right,aux);
    }
    return aux;
}

function postOrder(root,aux=[]){
    if(root!=null){
        
        postOrder(root.left,aux);  
        postOrder(root.right,aux);
        aux.push(root.data);
    }
    return aux;
}

function heightTree(root){
    if(root==null){
        return 0;
    }else{
        let lefth=heightTree(root.left);
        let righth=heightTree(root.right);

        if(lefth>righth){
            return lefth+1;
        }else{
            return righth+1;
        }
    }
}
function isBalanced(root){
    if(root==null){
        return 0;
    }else{
        let lefth=heightTree(root.left);
        let righth=heightTree(root.right);

        if(lefth>righth){
            let result= lefth - righth;
            if(result<2){
                return true;
            }else{
                return false
            }
        }else if(righth>lefth){
            let result=righth-lefth;
            if (result<2){
                return true;
            }else{
                return false;
            }
        }if(lefth==righth){
            return true;
        }
    }

}

function rebalanceTree(root,aux=[]){
    if(root!=null){
        rebalanceTree(root.left,aux);
        aux.push(root.data);
        rebalanceTree(root.right,aux);
    }
    return buildTree(aux,0,aux.length-1);
}


let b =buildTree(a,0,a.length-1);
prettyPrint(b);
insertTree(b,22);
insertTree(b,224);
insertTree(b,2244);
insertTree(b,2133);
insertTree(b,1255);
prettyPrint(b);
b=rebalanceTree(b);
prettyPrint(b);