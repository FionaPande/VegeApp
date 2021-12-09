<%@page import="data.Products"%> 
<%@page import="java.util.ArrayList"%> 
<%@page contentType="text/html" pageEncoding="UTF-8"%> 
<!DOCTYPE html> 
<html> 
  <head> 
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> 
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <style>
.center {
  margin: auto;
  width: 50%;
  border: 3px solid #000000;
  padding: 10px;
  background-color: #CCC
}
</style>
 <script> 
 function deleteThis(id){
	 var xhttp = new XMLHttpRequest();
	
	  var url= "/rest/veganservice/deleteProduct/"
	  
	  xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	      document.getElementById("this").innerHTML =
	      this.responseText;
	      window.alert("Got deleted!")
	      window.location.reload(true); 

	    }else if (this.status){
			document.getElementById("this").innerHTML = "Can not access: "  
				+ " <br /> Response: " + this.status + " " + this.responseText;
		}else{
			document.getElementById("this").innerHTML = "Loading... ";
		}
	  };
	  
	  xhttp.open("GET", url+id, true);
	  xhttp.send();
	}
 
 

 </script>
   <title>Product List</title> 

  </head> 
  
  <body> 
  <div class="center">
     <h1>Displaying Product List</h1> 
     <a href="/addproducts.html" class="btn btn-info" role="button">Add New</a>  <a href="/GetSuggestions" class="btn btn-info" role="button">Show Suggestions</a>
     
     
     <div id="this"></div>
   <button type="button" class="btn btn-default" data-toggle="collapse" data-target="#demo">Shampoo</button>
  <div id="demo" class="collapse">
 
    <table class="table table-striped">
    <thead>
      <tr>
        <th>Title</th>
        <th>Brand</th>
        <th>ID</th>
      </tr>
    </thead>
        <%-- Fetching the attributes of the request object 
             which was previously set by the servlet  
              "StudentServlet.java" 
        --%>  
        <%ArrayList<Products> std =  
            (ArrayList<Products>)request.getAttribute("shampoos"); 
        for(Products s:std){%> 
        <%-- Arranging data in tabular form 
        --%> 
            <tbody> 
            <tr>
                <td><%=s.getTitle()%></td> 
                <td><%=s.getBrand()%></td> 
                   <td><%=s.getId()%></td> 
                   
                
                     <td> <a href='/updateform.jsp?id=<%=s.getId()%>&title=<%=s.getTitle()%>&brand=<%=s.getBrand()%>&description=<%=s.getDescription()%>&stores=<%=s.getStores()%>&photo=<%=s.getPhoto()%>&category=<%=s.getCategoryId()%>'>Update</a>  
                      
            <td> <a href='#' onclick='deleteThis(<%=s.getId()%>)'onclick="return confirm('Are you sure?')" >Delete</a>  

     </tr>
			</tbody>		
                
           
            <%}%> 
        </table>  
        <hr/> 
  </div>
  
  <br>
  
   
   <button type="button" class="btn btn-default" data-toggle="collapse" data-target="#con">Conditioner</button>
  <div id="con" class="collapse">
 
    <table class="table table-striped">
    <thead>
      <tr>
        <th>Title</th>
        <th>Brand</th>
        <th>ID</th>
      </tr>
    </thead>
        <%-- Fetching the attributes of the request object 
             which was previously set by the servlet  
              "StudentServlet.java" 
        --%>  
        <%ArrayList<Products> ct =  
            (ArrayList<Products>)request.getAttribute("conditioner"); 
        for(Products s:ct){%> 
        <%-- Arranging data in tabular form 
        --%> 
            <tbody> 
            <tr>
                <td><%=s.getTitle()%></td> 
                <td><%=s.getBrand()%></td> 
                   <td><%=s.getId()%></td> 
                   
                
                     <td> <a href='/updateform.jsp?id=<%=s.getId()%>&title=<%=s.getTitle()%>&brand=<%=s.getBrand()%>&description=<%=s.getDescription()%>&stores=<%=s.getStores()%>&photo=<%=s.getPhoto()%>&category=<%=s.getCategoryId()%>'>Update</a>  
                      
            <td> <a href='#' onclick='deleteThis(<%=s.getId()%>)'onclick="return confirm('Are you sure?')" >Delete</a>  

     </tr>
			</tbody>		
                
           
            <%}%> 
        </table>  
        <hr/> 
  </div>
  
  <br>
   <button type="button" class="btn btn-default" data-toggle="collapse" data-target="#bod">Body</button>
  <div id="bod" class="collapse">
 
    <table class="table table-striped">
    <thead>
      <tr>
        <th>Title</th>
        <th>Brand</th>
        <th>ID</th>
      </tr>
    </thead>
        <%-- Fetching the attributes of the request object 
             which was previously set by the servlet  
              "StudentServlet.java" 
        --%>  
        <%ArrayList<Products> b =  
            (ArrayList<Products>)request.getAttribute("body"); 
        for(Products s:b){%> 
        <%-- Arranging data in tabular form 
        --%> 
            <tbody> 
            <tr>
                <td><%=s.getTitle()%></td> 
                <td><%=s.getBrand()%></td> 
                   <td><%=s.getId()%></td> 
                   
                
                     <td> <a href='/updateform.jsp?id=<%=s.getId()%>&title=<%=s.getTitle()%>&brand=<%=s.getBrand()%>&description=<%=s.getDescription()%>&stores=<%=s.getStores()%>&photo=<%=s.getPhoto()%>&category=<%=s.getCategoryId()%>'>Update</a>  
                      
            <td> <a href='#' onclick='deleteThis(<%=s.getId()%>)'onclick="return confirm('Are you sure?')" >Delete</a>  

     </tr>
			</tbody>		
                
           
            <%}%> 
        </table>  
        <hr/> 
  </div>
  
  <br>
  
     <button type="button" class="btn btn-default" data-toggle="collapse" data-target="#fac">Face</button>
  <div id="fac" class="collapse">
 
    <table class="table table-striped">
    <thead>
      <tr>
        <th>Title</th>
        <th>Brand</th>
        <th>ID</th>
      </tr>
    </thead>
        <%-- Fetching the attributes of the request object 
             which was previously set by the servlet  
              "StudentServlet.java" 
        --%>  
        <%ArrayList<Products> f =  
            (ArrayList<Products>)request.getAttribute("face"); 
        for(Products s:f){%> 
        <%-- Arranging data in tabular form 
        --%> 
            <tbody> 
            <tr>
                <td><%=s.getTitle()%></td> 
                <td><%=s.getBrand()%></td> 
                   <td><%=s.getId()%></td> 
                   
                
                     <td> <a href='/updateform.jsp?id=<%=s.getId()%>&title=<%=s.getTitle()%>&brand=<%=s.getBrand()%>&description=<%=s.getDescription()%>&stores=<%=s.getStores()%>&photo=<%=s.getPhoto()%>&category=<%=s.getCategoryId()%>'>Update</a>  
                      
            <td> <a href='#' onclick='deleteThis(<%=s.getId()%>)' onclick="return confirm('Are you sure?')">Delete</a>  

     </tr>
			</tbody>		
                
           
            <%}%> 
        </table>  
        <hr/> 
  </div>
  
  <br>
  
     <button type="button" class="btn btn-default" data-toggle="collapse" data-target="#deod">Deo</button>
  <div id="deod" class="collapse">
 
    <table class="table table-striped">
    <thead>
      <tr>
        <th>Title</th>
        <th>Brand</th>
        <th>ID</th>
      </tr>
    </thead>
        <%-- Fetching the attributes of the request object 
             which was previously set by the servlet  
              "StudentServlet.java" 
        --%>  
        <%ArrayList<Products> d =  
            (ArrayList<Products>)request.getAttribute("deo"); 
        for(Products s:d){%> 
        <%-- Arranging data in tabular form 
        --%> 
            <tbody> 
            <tr>
                <td><%=s.getTitle()%></td> 
                <td><%=s.getBrand()%></td> 
                   <td><%=s.getId()%></td> 
                   
                
                     <td> <a href='/updateform.jsp?id=<%=s.getId()%>&title=<%=s.getTitle()%>&brand=<%=s.getBrand()%>&description=<%=s.getDescription()%>&stores=<%=s.getStores()%>&photo=<%=s.getPhoto()%>&category=<%=s.getCategoryId()%>'>Update</a>  
                      
            <td> <a href='#' onclick='deleteThis(<%=s.getId()%>)'onclick="return confirm('Are you sure?')" >Delete</a>  

     </tr>
			</tbody>		
                
           
            <%}%> 
        </table>  
        <hr/> 
  </div>
  
  <br>
     <button type="button" class="btn btn-default" data-toggle="collapse" data-target="#clean">Cleaning</button>
  <div id="clean" class="collapse">
 
    <table class="table table-striped">
    <thead>
      <tr>
        <th>Title</th>
        <th>Brand</th>
        <th>ID</th>
      </tr>
    </thead>
        <%-- Fetching the attributes of the request object 
             which was previously set by the servlet  
              "StudentServlet.java" 
        --%>  
        <%ArrayList<Products> cle =  
            (ArrayList<Products>)request.getAttribute("clean"); 
        for(Products s:cle){%> 
        <%-- Arranging data in tabular form 
        --%> 
            <tbody> 
            <tr>
                <td><%=s.getTitle()%></td> 
                <td><%=s.getBrand()%></td> 
                   <td><%=s.getId()%></td> 
                   
                
                     <td> <a href='/updateform.jsp?id=<%=s.getId()%>&title=<%=s.getTitle()%>&brand=<%=s.getBrand()%>&description=<%=s.getDescription()%>&stores=<%=s.getStores()%>&photo=<%=s.getPhoto()%>&category=<%=s.getCategoryId()%>'>Update</a>  
                      
            <td> <a href='#' onclick='deleteThis(<%=s.getId()%>)' onclick="return confirm('Are you sure?')">Delete</a>  

     </tr>
			</tbody>		
                
           
            <%}%> 
        </table>  
        <hr/> 
  </div>
  
  <br>
  
     <button type="button" class="btn btn-default" data-toggle="collapse" data-target="#laundry">Laundry</button>
  <div id="laundry" class="collapse">
 
    <table class="table table-striped">
    <thead>
      <tr>
        <th>Title</th>
        <th>Brand</th>
        <th>ID</th>
      </tr>
    </thead>
        <%-- Fetching the attributes of the request object 
             which was previously set by the servlet  
              "StudentServlet.java" 
        --%>  
        <%ArrayList<Products> lau =  
            (ArrayList<Products>)request.getAttribute("laundry"); 
        for(Products s:lau){%> 
        <%-- Arranging data in tabular form 
        --%> 
            <tbody> 
            <tr>
                <td><%=s.getTitle()%></td> 
                <td><%=s.getBrand()%></td> 
                   <td><%=s.getId()%></td> 
                   
                
                     <td> <a href='/updateform.jsp?id=<%=s.getId()%>&title=<%=s.getTitle()%>&brand=<%=s.getBrand()%>&description=<%=s.getDescription()%>&stores=<%=s.getStores()%>&photo=<%=s.getPhoto()%>&category=<%=s.getCategoryId()%>'>Update</a>  
                      
            <td> <a href='#' onclick='deleteThis(<%=s.getId()%>)' onclick="return confirm('Are you sure?')">Delete</a>  

     </tr>
			</tbody>		
                
           
            <%}%> 
        </table>  
        <hr/> 
  </div>
  
  <br>
     <button type="button" class="btn btn-default" data-toggle="collapse" data-target="#oral">Oral Hygiene</button>
  <div id="oral" class="collapse">
 
    <table class="table table-striped">
    <thead>
      <tr>
        <th>Title</th>
        <th>Brand</th>
        <th>ID</th>
      </tr>
    </thead>
        <%-- Fetching the attributes of the request object 
             which was previously set by the servlet  
              "StudentServlet.java" 
        --%>  
        <%ArrayList<Products> oral =  
            (ArrayList<Products>)request.getAttribute("oral"); 
        for(Products s:oral){%> 
        <%-- Arranging data in tabular form 
        --%> 
            <tbody> 
            <tr>
                <td><%=s.getTitle()%></td> 
                <td><%=s.getBrand()%></td> 
                   <td><%=s.getId()%></td> 
                   
                
                     <td> <a href='/updateform.jsp?id=<%=s.getId()%>&title=<%=s.getTitle()%>&brand=<%=s.getBrand()%>&description=<%=s.getDescription()%>&stores=<%=s.getStores()%>&photo=<%=s.getPhoto()%>&category=<%=s.getCategoryId()%>'>Update</a>  
                      
            <td> <a href='#' onclick='deleteThis(<%=s.getId()%>)'onclick="return confirm('Are you sure?')" >Delete</a>  

     </tr>
			</tbody>		
                
           
            <%}%> 
        </table>  
        <hr/> 
  </div>
  
  <br>
     <button type="button" class="btn btn-default" data-toggle="collapse" data-target="#hairc">Hair Color</button>
  <div id="hairc" class="collapse">
 
    <table class="table table-striped">
    <thead>
      <tr>
        <th>Title</th>
        <th>Brand</th>
        <th>ID</th>
      </tr>
    </thead>
        <%-- Fetching the attributes of the request object 
             which was previously set by the servlet  
              "StudentServlet.java" 
        --%>  
        <%ArrayList<Products> hair =  
            (ArrayList<Products>)request.getAttribute("hair"); 
        for(Products s:hair){%> 
        <%-- Arranging data in tabular form 
        --%> 
            <tbody> 
            <tr>
                <td><%=s.getTitle()%></td> 
                <td><%=s.getBrand()%></td> 
                   <td><%=s.getId()%></td> 
                   
                
                     <td> <a href='/updateform.jsp?id=<%=s.getId()%>&title=<%=s.getTitle()%>&brand=<%=s.getBrand()%>&description=<%=s.getDescription()%>&stores=<%=s.getStores()%>&photo=<%=s.getPhoto()%>&category=<%=s.getCategoryId()%>'>Update</a>  
                      
            <td> <a href='#' onclick='deleteThis(<%=s.getId()%>)' onclick="return confirm('Are you sure?')" >Delete</a>  

     </tr>
			</tbody>		
                
           
            <%}%> 
        </table>  
        <hr/> 
  </div>
  
  <br>
  
  
  
     </div>
    </body> 
</html> 