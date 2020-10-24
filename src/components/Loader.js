import React from 'react';
import { useLoading, Audio } from '@agney/react-loading';

function Loader() {
    const { containerProps, indicatorEl } = useLoading({
        loading: true,
        indicator: <Audio width="45" />,
    });

    return(
        <section {...containerProps} className="align-content-center" style={{textAlign: 'center'}}>
            {indicatorEl}
        </section>
    )
}

export default Loader;