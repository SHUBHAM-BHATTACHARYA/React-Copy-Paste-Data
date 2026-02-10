import React, { useState } from 'react'

export const CopyPaste = () => {

    const [gridData, setGridData] = useState([
    ])

    const handleInputChange = (e, id) =>{
        console.log(e.target)
        const {name, value} = e.target;
        setGridData(prevGridData=>{
            return(
                prevGridData.map(item=>{
                if(item.id === id){
                    return {...item, [name]:value}
                }
                return item
            }))
        })
    }

    const handleTabularPaste = (e) =>{
        e.preventDefault();
        const pasteData = e.clipboardData.getData("Text")
        console.log(pasteData)
        const rowData = pasteData.split("\r\n")
        console.log(rowData)
        const rowCount = rowData.length - 1
        const newGridData = []
        for(let i=0;i<rowCount;i++){
            const columnData = rowData[i].split("\t");
            const gridItem = {};
            gridItem.name = columnData[0]
            gridItem.email = columnData[1]
            gridItem.phone = columnData[2]

            newGridData.push(gridItem)
        }
        console.log(rowCount)
        setGridData(newGridData)
    }

    console.log(gridData)

  return (
    <div>
        <table>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone No</th>
            </tr>
            {/* when there is data in gridData */
            gridData.length>0? gridData?.map((item, index) =>{
                return(
                    <tr key={index}>
                        <td>
                            <input
                                type='text'
                                name='name'
                                value={item.name}
                                onChange={(e)=>handleInputChange(e, item.id)}
                                onPaste={handleTabularPaste}
                            />
                        </td>
                        <td>
                            <input
                                type='text'
                                name='email'
                                value={item.email}
                                onChange={(e)=>handleInputChange(e, item.id)}
                                onPaste={handleTabularPaste}
                            />
                        </td>
                        <td>
                            <input
                                type='text'
                                name='phone'
                                value={item.phone}
                                onChange={(e)=>handleInputChange(e, item.id)}
                                onPaste={handleTabularPaste}
                            />
                        </td>
                    </tr>
                )
            }): /* when there is no data in gridData -> Extra Row */
                <tr>
                    <td>
                        <input
                            type='text'
                            name='name'
                            onPaste={handleTabularPaste}
                        />
                    </td>
                    <td>
                        <input
                            type='text'
                            name='email'
                            disabled
                        />
                    </td>
                    <td>
                        <input
                            type='text'
                            name='phone'
                            disabled
                        />
                    </td>
                </tr>
            }
        </table>
    </div>
  )
}

