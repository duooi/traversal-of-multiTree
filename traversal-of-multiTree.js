var Node = [];
var timer = null;
var i = 0;
var index = 0;

window.onload = function(){
	//获取页面的按钮
	var container = document.getElementById("container");
	var deepBtn = document.getElementById("deepTraversal");
	var levelBtn = document.getElementById("levelTraversal");
	var deepSearchBtn = document.getElementById("deep-search-btn");
	var wideSearchBtn = document.getElementById("wide-search-btn");
	var insertBtn = document.getElementById("insert-btn");
	var delBtn = document.getElementById("delete-btn");
	var replaceBtn = document.getElementById("replace-btn");

	var container = document.getElementById("container");
	//绑定事件
	deepBtn.onclick = deepTraversalSearch;

	levelBtn.onclick = widthTraversalSearch;

	deepSearchBtn.onclick = deepTraversalSearch;

	wideSearchBtn.onclick = widthTraversalSearch;

	container.onclick = function(e){
		clearAll();
		e.target.style.backgroundColor = '#eee';
		insertBtn.onclick = function(){
			insertNode(e);
		};

		delBtn.onclick = function(){
			deleteNode(e);
		};
	};
}

//深度遍历查找操作
function deepTraversalSearch(){
	clearTimeout(timer);
	resetAfterNode(0);
	Node = [];
	i = 0;
	deepTraversal(container);
	visitElementNodes();
}

//广度遍历查找操作
function widthTraversalSearch(){
	clearTimeout(timer);
	resetAfterNode(0);
	Node = [];
	i = 0;
	index = 0;
	levelTraversal(container);
	visitElementNodes();
}

//深度优先遍历                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
function deepTraversal(parentNode){
	if(parentNode){
		Node.push(parentNode);
		for(var i=0;i<parentNode.childNodes.length;i++){
			if(parentNode.childNodes[i].nodeType == 1){
				deepTraversal(parentNode.childNodes[i]);
			}
		}
	}
}

//广度优先遍历
function levelTraversal(parentNode){
	if(parentNode){
		Node.push(parentNode);
		levelTraversal(parentNode.nextElementSibling);
		parentNode = Node[index++];
		levelTraversal(parentNode.firstElementChild);
	}
}

//遍历节点
function visitElementNodes(){
	var searchContent = document.getElementById("search-area").value;
	if(i == 0){
		visitNode(Node[i]);
		resetAfterNode(i+1);
	}else if(i == Node.length){
		resetNode(Node[i-1]);
		return;
	}else{
		if(!searchNode(Node[i-1],searchContent)){
			resetNode(Node[i-1]);
		}
		visitNode(Node[i]);
		resetAfterNode(i+1);
	}
	searchNode(Node[i],searchContent);
	i++;
	timer = setTimeout(visitElementNodes,500);
}

//访问节点
function visitNode(node){
	node.style.backgroundColor = '#eee';
}

//重置节点
function resetNode(node){
	node.style.backgroundColor = '#fff';
}

//重置索引为n之后的节点样式
function resetAfterNode(n){
	for(var j=n;j<Node.length;j++){
		resetNode(Node[j]);
	}
}

//查找节点
function searchNode(node,content){
	if(node.getAttribute("title") == content){
		visitNode(node);
		return true;
	}
}

//插入节点
function insertNode(event){
	var nodeValue = document.getElementById("node").value;
	var parentNode = event.target;
	var className = ["level-one","level-two","level-three","level-four"];

	var node = document.createElement("div");
	node.innerHTML = nodeValue;

	//增加节点类名
	if(parentNode.firstElementChild){
		node.className = parentNode.firstElementChild.className;
	}else{
		for(var i=0;i<className.length;i++){
			if(parentNode.className == className[i]){
				node.className = className[i+1];
			}
		}
	}
	parentNode.appendChild(node);
}

//删除节点
function deleteNode(e){
	e.target.parentNode.removeChild(e.target);
}

//清除wrapper中所有节点样式
function clearAll(){
	var wrapper = document.getElementById("wrapper");
	var node = wrapper.getElementsByTagName("*");
	for(var i=0;i<node.length;i++){
		resetNode(node[i]);
	}
}
