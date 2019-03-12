$(document).ready(function (){
    $.ajax({
        url: 'http://todo-api.local.geekydev.com/api/read.php',
        dataType: 'json',
        type: 'get',
        success: function(data){    
            render(data);
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
});

function render(data){
    var list = $("#root");
    list.empty();

    if(data.length > 0){
        $.each(data, function(key, value){

            var li = document.createElement('li');

            var chkbox = document.createElement('input');
            chkbox.type='checkbox';
            chkbox.setAttribute('onchange', "change_status("+ value.id + ",'" +value.caption +"'," +value.is_completed + ")");
            
            if(value.is_completed == 1){
                chkbox.setAttribute("checked", "true");
                li.setAttribute("style", "text-decoration: line-through");
            }
            else
                li.setAttribute("style", "text-decoration: none");
            
            
            var caption = document.createTextNode(value.caption);
                
            var updatebtn = document.createElement('button');
            updatebtn.innerHTML = "update";
            updatebtn.className = "btn btn-outline-warning";
            updatebtn.setAttribute('onclick', "update_data(" + value.id + ",'" +value.caption + "'," +value.is_completed + ")");

            var delbtn = document.createElement('button');
            delbtn.innerHTML = "delete";
            delbtn.className = "btn btn-outline-success";
            delbtn.setAttribute('onclick', "delete_data(" + value.id + ")");

            li.appendChild(chkbox);
            li.appendChild(caption);
            li.appendChild(updatebtn);
            li.appendChild(delbtn);

            var ul = document.createElement('ul');
            ul.appendChild(li);
            document.getElementById('root').appendChild(ul);            
        })
    }
}

function get_data(){
    $.ajax({
        url: 'http://todo-api.local.geekydev.com/api/read.php',
        dataType: 'json',
        type: 'get',
        success: function(data){    
            render(data);
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
}
function add_task(){
    var caption = $('#caption').serialize();
    $.ajax({
        url: 'http://todo-api.local.geekydev.com/api/create.php',
        dataType: 'json',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded',
        data: caption,
        success: function(data){    
            $('#caption').val('');
            get_data();
        },
        error: function(jqXhr, textStatus, errorThrown){
            console.log( errorThrown );
        }
    });
}
function change_status(id, caption, is_completed){
    change_is_completed = is_completed+1;
    $.ajax({
        url: 'http://todo-api.local.geekydev.com/api/update.php',
        dataType: 'text',
        type: 'put',
        contentType: 'application/x-www-form-urlencoded',
        data: {
                'id': id,
                'updatedCaption': caption,
                'is_completed': change_is_completed%2
            },
        success: function(data, textStatus, jQxhr){
            get_data();
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    })
}
function update_data(id, caption, is_completed){    
    var updatedCaption = prompt("Update Task: "+caption);
    $.ajax({
        url: 'http://todo-api.local.geekydev.com/api/update.php',
        dataType: 'text',
        type: 'put',
        contentType: 'application/x-www-form-urlencoded',
        data: {
                'id': id,
                'updatedCaption': updatedCaption,
                'is_completed': 0
            },
        success: function(data, textStatus, jQxhr){
            get_data();
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });

}
function delete_data(id){
    $.ajax({
        url: 'http://todo-api.local.geekydev.com/api/delete.php?index='+id,
        dataType: 'text',
        type: 'delete',
        contentType: 'application/x-www-form-urlencoded',
        success: function(data, textStatus, jQxhr){    
            get_data();
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
}
function clear_all(){
    var x = confirm("Are you sure you want to delete?");
    if (!x)
        return false;
    else{
        $.ajax({
            url: 'http://todo-api.local.geekydev.com/api/delete.php',
            dataType: 'text',
            type: 'delete',
            contentType: 'application/x-www-form-urlencoded',
            success: function(data, textStatus, jQxhr){    
                get_data();
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });
    }
}