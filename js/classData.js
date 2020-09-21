var setBanner = function(message)
{
    d3.select("#banner")
    .text(message);
}

var planetPromise = d3.json("../json/classData.json")





var getGrade = function(quiz)
{
    return quiz.grade;
};

var hwMean = function(penguin)
{
    var hwGrade = penguin.homework.map(getGrade);
                  return d3.mean(hwGrade); 
}
            
var quizMean = function(penguin)
{
    var quizGrade = penguin.quizes.map(getGrade);
                 return d3.mean(quizGrade)
}
var testMean = function(penguin)    
{
    var testGrade = penguin.test.map(getGrade);
                 return d3.mean(testGrade)
}
    
    
    
    
    
    
    
    
var drawTable = function(penguins)
{
    var rows = d3.select("table tbody")
    .selectAll("tr")
    .data(penguins)
    .enter()
    .append("tr")
    
    rows.append("td")
    .append("img")
    .attr("src",function(penguin)
         {
          return "imgs/"+penguin.picture
         });
    
     rows.append("td")
    .text(function(penguin)
         {
          return penguin.final[0].grade
         });
    
    
     rows.append("td")
       .text(hwMean);
    
     rows.append("td")
       .text(quizMean);
    
    rows.append("td")
          .text(testMean);
    
    
    
    
    rows.on("mouseenter",function(penguin)
           {
        setBanner("Looking at"+penguin.picture);
    })
}


var cmpFinal = function(penguinA,penguinB)
{
    if(penguinA.final[0].grade == penguinB.final[0].grade)
        {return 0;}
    else if(penguinA.final[0].grade < penguinB.final[0].grade)
        {return -1;}
    else
        {return 1;}
}

var sortOnFinal = function(penguins)
    {
        d3 .select("#final")
        .on("click",function()
        {console.log("final clicked")});
        
        var newOrder = penguins.sort(cmpFinal);
        console.log(newOrder);
        
        d3.select("table tbody")
        .selectAll("*")
        .remove();
        
        drawTable(newOrder);
    }











var sucFCN = function(penguins)
{
    console.log("penguins",penguins);
    setBanner("Here are the class data");
    drawTable(penguins);
    sortOnFinal(penguins);
   
}

var failFCN = function(error)
{
    console.log("error",error);
    setBanner("Data are missing");
    
}



planetPromise.then(sucFCN,failFCN)