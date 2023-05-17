import React from 'react';

const MsgBox = () => {
    return (
        
  

        <div>
            <center>
                <h style= {{Color:"indigo",fontSize:25}} >MESSAGE BOX</h></center><br></br>
            <br></br>
            <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Missing Person</th>
      <th scope="col">User</th>
      <th scope="col">User-No</th>
      <th scope="col">User-location</th>
      <th scope="col">Investigator</th>
      <th scope="col">Image</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Sita</td>
      <td>James</td>
      <td>9856421555</td>
      <td>Ernakulam</td>
      <td>Hari</td>
      <td><a href="#" class="link-primary">View</a></td>
      
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Alice</td>
      <td>8541278565</td>
      <td>Kottayam</td>
      <td>Ram</td>
      <td><a href="#" class="link-primary">View</a></td>
      
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>Bob</td>
      <td>9965478521</td>
      <td>Thrissur</td>
      <td>Mohammed</td>
      <td><a href="#" class="link-primary">View</a></td>
      
    </tr>
  </tbody>
</table>
        </div>
        
        );
    }
    export default MsgBox;