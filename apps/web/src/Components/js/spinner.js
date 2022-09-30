import React from 'react';
import '../css/styles.css';
import '../css/fonts.css';
import { CircleLoader } from 'react-spinners';

const Spinner = (props) => {
    return <div className="h-32 mx-auto mt-32 ">
        <CircleLoader
            sizeUnit={"rem"}
            size={16}
            color={'white'}
            loading={props.loading}
        />
        <p className="select-none text-white text-center font2 font-bold mt-2 ">Searching for a chat.. </p>
    </div>
}

export default Spinner;