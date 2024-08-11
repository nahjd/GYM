import React from 'react';
import './Timetable.scss';

const Timetable = () => {
    const getTooltipText = (text) => {
        if (text.includes('FITNESS CLASS') || text.includes('CARDIO')) {
            return 'Cardio';
        }
        return 'Strength';
    };

    return (
        <>
            <header id="header">
                <table id="unit" align="center">

                    <h1>CLASSES TIMETABLE </h1> <br />

                </table>

            </header>

            <main id="tables">
                <div className="table-container">
                    <table className="timetable">
                        <thead>
                            <tr>
                                <th></th>
                                <th>MONDAY</th>
                                <th className='tuesday'>TUESDAY</th>
                                <th className='wednesday'>WEDNESDAY</th>
                                <th className='thursday'>THURSDAY</th>
                                <th className='friday'>FRIDAY</th>
                                <th className='saturday'>SATURDAY</th>
                                <th className='sunday'>SUNDAY</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="row_1 row_gray ">
                                <td>07:00 - 08:00</td>
                                <td className="event">
                                    FITNESS CLASS<br /> <p>Gloria Parker</p>
                                    <div className="tooltip">{getTooltipText('FITNESS CLASS')}</div>
                                </td>
                                <td className="event tuesday">
                                    OPEN GYM<br /> <p>Madison Fran</p>
                                    <div className="tooltip">{getTooltipText('OPEN GYM')}</div>
                                </td>
                                <td className='wednesday'></td>
                                <td className="event thursday">
                                    Cardio Box<br /> <p>Lisa Stewart</p>
                                    <div className="tooltip">{getTooltipText('Cardio Box')}</div>
                                </td>
                                <td className="event friday">
                                    INTENSE BODYBUILDING<br /> <p>Lisa Stewart</p>
                                    <div className="tooltip">{getTooltipText('INTENSE BODYBUILDING')}</div>
                                </td>
                                <td className='saturday'></td>
                                <td className="event sunday ">
                                    OPEN GYM<br /> <p>Samantha Howard</p>
                                    <div className="tooltip">{getTooltipText('OPEN GYM')}</div>
                                </td>
                            </tr>
                            <tr className="row_1 row_gray">
                                <td>08:00 - 09:00</td>
                                <td className="event">
                                    OPEN GYM<br /> <p>Madison Fran</p>
                                    <div className="tooltip">{getTooltipText('OPEN GYM')}</div>
                                </td>
                                <td className='tuesday'></td>
                                <td className="event wednesday">
                                    BODY BALANCE<br /> <p>William Dixon</p>
                                    <div className="tooltip">{getTooltipText('BODY BALANCE')}</div>
                                </td>
                                <td rowSpan="2" className="event thursday">
                                    OPEN GYM<br /> <p>Madison Fran</p>
                                    <div className="tooltip">{getTooltipText('OPEN GYM')}</div>
                                </td>
                                <td className='friday'></td>
                                <td className="event saturday">
                                    BODY PUMP<br /> <p>Melanie Payne</p>
                                    <div className="tooltip">{getTooltipText('BODY PUMP')}</div>
                                </td>
                                <td className="event sunday">
                                    CROSS FITT<br /> <p>William Dixon</p>
                                    <div className="tooltip">{getTooltipText('CROSS FITT')}</div>
                                </td>
                            </tr>
                            <tr className="row_1 row_gray">
                                <td>09:00 - 10:00</td>
                                <td></td>
                                <td rowSpan="2" className="event tuesday">
                                    INTENSE BODYBUILDING<br /> <p>Lisa Stewart</p>
                                    <div className="tooltip">{getTooltipText('INTENSE BODYBUILDING')}</div>
                                </td>
                                <td className="event wednesday">
                                    CROSS FITT<br /> <p>William Dixon</p>
                                    <div className="tooltip">{getTooltipText('CROSS FITT')}</div>
                                </td>
                                <td className="event friday">
                                    BODY BALANCE<br /><p>William Dixon</p>
                                    <div className="tooltip">{getTooltipText('BODY BALANCE')}</div>
                                </td>
                                <td className="event saturday">
                                    OPEN GYM<br /><p>Samantha Howard</p>
                                    <div className="tooltip">{getTooltipText('OPEN GYM')}</div>
                                </td>
                                <td rowSpan="2" className="event sunday">
                                    INTENSE BODYBUILDING<br /> <p>Lisa Stewart</p>
                                    <div className="tooltip">{getTooltipText('INTENSE BODYBUILDING')}</div>
                                </td>
                            </tr>
                            <tr className="row_1 row_gray">
                                <td>10:00 - 11:00</td>
                                <td className="event tuesday">
                                    Cardio Box<br /><p>Lisa Stewart</p>
                                    <div className="tooltip">{getTooltipText('Cardio Box')}</div>
                                </td>
                                <td className='wednesday'></td>
                                <td className="event thursday">
                                    FITNESS CLASS<br /> <p>Gloria Parker</p>
                                    <div className="tooltip">{getTooltipText('FITNESS CLASS')}</div>
                                </td>
                                <td className='friday'></td>
                                <td className="event saturday">
                                    Cardio Box<br /> <p>Lisa Stewart</p>
                                    <div className="tooltip">{getTooltipText('Cardio Box')}</div>
                                </td>
                            </tr>
                            <tr className="row_1 row_gray">
                                <td>11:00 - 12:00</td>
                                <td></td>
                                <td className="event tuesday">
                                    BODY PUMP<br /> <p>Melanie Payne</p>
                                    <div className="tooltip">{getTooltipText('BODY PUMP')}</div>
                                </td>
                                <td className='wednesday'></td>
                                <td className="event thursday">
                                    Cardio Box<br /> <p>Lisa Stewart</p>
                                    <div className="tooltip">{getTooltipText('Cardio Box')}</div>
                                </td>
                                <td className='friday'></td>
                                <td className="event saturday">
                                    OPEN GYM<br /> <p>Samantha Howard</p>
                                    <div className="tooltip">{getTooltipText('OPEN GYM')}</div>
                                </td>
                                <td className="event sunday">
                                    FITNESS CLASS<br /> <p>Gloria Parker</p>
                                    <div className="tooltip">{getTooltipText('FITNESS CLASS')}</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>

        </>
    );
};

export default Timetable;
