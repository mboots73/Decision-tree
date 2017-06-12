//readfile


var fs = require('fs'),
    filePath = './beslisboom.txt';
var lines = fs.readFileSync(filePath).toString().split('\r\n');

var readline = require('readline');

rl = readline.createInterface(process.stdin, process.stdout);





//make edges en nodes
var nodes = new Array()
var edges = new Array()
var allEdges = new Array();
var allNodes = new Array();
var answers = [];

for (var i = 0; i < lines.length; i++) {
    if (lines[i].split(',').length < 3) {

        nodes.push(lines[i])
    }
    else {
        edges.push(lines[i])
    }
}

function edge(origin, destination, answer) {
    this.origin = origin;
    this.destination = destination;
    this.answer = answer;
    return {
        getOrigin:  this.origin
        ,
        getDestination: this.destination
        ,
        getAnswer: this.answer
        }

}

function node(nodename, nodequestion) {
    this.nodename = nodename;
    this.nodequestion = nodequestion;
    return {
        getNodeName:  this.nodename
        ,
        getNodeQuestion:this.nodequestion
        }

}



    for (var i = 0; i < edges.length; i++) {
       var edgeSplit = edges[i].split(", ");
        var edgeOrigin = edgeSplit[0];
        var edgeDestination = edgeSplit[1];
        var edgeAnswer = edgeSplit[2];
        allEdges.push(edge(edgeOrigin, edgeDestination, edgeAnswer));
};

for (var i = 0; i < nodes.length; i++) {
    var nodeSplit = nodes[i].split(", ");
    var nodename = nodeSplit[0];
    var nodequestion = nodeSplit[1];
    allNodes.push(node(nodename, nodequestion));
};


function tree(currentNode) {

        answers = [];
    if (currentNode.getNodeQuestion.indexOf('?') >= 0) {
        var count = 1
        console.log(currentNode.getNodeQuestion)
        for (var j = 0; j < allEdges.length; j++) {

            if (currentNode.getNodeName === allEdges[j].getOrigin) {
                answers.push(count + ". " + allEdges[j].getAnswer)
                console.log(count + ". " + allEdges[j].getAnswer)
                count = count + 1

            }


        }


        rl.question("Geeft je antwoord: ", findnewNode)

        function findnewNode(inputfromuser) {


                for (var j = 0; j < allEdges.length; j++) {
                    for (var z = 0; z < answers.length; z++) {
                        if (currentNode.getNodeName === allEdges[j].getOrigin && inputfromuser === answers[z].split(". ")[0] && answers[z].split(". ")[1] === allEdges[j].getAnswer) {

                            for (var k = 0; k < allNodes.length; k++) {

                                if (allNodes[k].getNodeName === allEdges[j].getDestination) {

                                    tree(allNodes[k]);

                                }
                            }

                        }


                }
            }

        }
    }

    else
        {
            console.log(currentNode.getNodeQuestion);

        }


    }



rl.question("Start", tree(allNodes[0]))