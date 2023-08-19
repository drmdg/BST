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



let b =buildTree(a,0,a.length-1);
prettyPrint(b);
deleteNode(b,11);
prettyPrint(b);