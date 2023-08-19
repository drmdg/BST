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



let b =buildTree(a,0,a.length-1);
prettyPrint(b);