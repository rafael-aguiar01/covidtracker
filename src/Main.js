import React, {useState, useEffect} from 'react'
import axios from 'axios'

import 'jquery/dist/jquery.min.js'
import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import $ from 'jquery'

export default function Main() {

    const [coviddata, setcoviddata]=useState([])

    useEffect(() => {
        
      axios.get('https://api.covid19api.com/summary').then(res=>{
          console.log(res.data)
          setcoviddata(res.data.Countries)
      }).catch(err=>{console.log(err)})

      $(document).ready(() =>{
    
        $('#mytable').DataTable()

      })

    }, [coviddata])

    const tabledata = coviddata.map(obj =>{
        return <tr>
            <td>{obj.Country}</td>
            <td>{obj.TotalConfirmed}</td>
            <td>{obj.TotalConfirmed - obj.TotalRecovered}</td>
            <td>{obj.TotalRecovered}</td>
            <td>{obj.TotalDeaths}</td>
        </tr>
    })
    return (
        <div>
            <h1>Covid Stats</h1>

            <div className = "row justify-content-center">
                <div className="col-md-8">
                    <table id='mytable' className='table table-dark'>
                        <thead>
                            <tr>
                                <th>País</th>
                                <th>Confirmado</th>
                                <th>Ativo</th>
                                <th>Recuperado</th>
                                <th>Mortos</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tabledata}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
