import React, { useState } from 'react'
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import "./diningmemo.scss"

import styled from "@emotion/styled";
import useFetch from "../../../hooks/useFetch";

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import Accordion from "../../../components/accordion/Accordion"
import { Chip, Divider } from '@mui/material'
import { SideBarDataProvost } from '../../../components/sidebar/SideBarData';


export const StyleWrapper = styled.div`
  .fc td {
    background: darkgray;
    height: 'parent';
  }
`


const adapter = new AdapterDateFns();
const DiningMemoProv =  () => {
    const memoList = useFetch("/dining/getAllMemos");
    const [items,setListItems] = useState([]);


    return (
        <div className='dining'>
            {memoList.loading?"Loading":<>
            <Sidebar info={SideBarDataProvost}/>
            <div className="diningContainer">
                <Navbar/>
                <Divider>
                    <Chip label="Submitted Memos" />
                </Divider>
                <div className="bottom">
                    {memoList.loading?"Loading":
                    <div
                        className="accordion"
                        >
                        <Accordion showButton={false} items={memoList.data.map(
                            (item) => {
                                const {file,...rest} = item;
                                return {value:{...rest},file:file,key:item._id}
                            }

                        )} setListItems={setListItems}/>
                    </div>
            }
                </div>
            </div>
            </>}
        </div>
    )

}

export default DiningMemoProv;