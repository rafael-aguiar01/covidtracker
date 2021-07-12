import React, {useState, useEffect} from 'react'
import axios from 'axios'
export default function Main() {

    const [coviddata, setcoviddata]=useState([])

    useEffect(() => {
        
      axios.get('https://api.covid19api.com/summary').then(res=>{
          console.log(res.data)
          setcoviddata(res.data.Countries)
      }).catch(err=>{console.log(err)})

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
                    <table className='table table-dark'>
                        <thred>
                            <tr>
                                <th>País</th>
                                <th>Confirmado</th>
                                <th>Ativo</th>
                                <th>Recuperado</th>
                                <th>Mortos</th>
                            </tr>
                        </thred>

                        <tbody>
                            {tabledata}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
