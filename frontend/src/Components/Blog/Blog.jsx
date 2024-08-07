import React, { useState } from 'react';
import './Blog.scss';

const BMICalculator = () => {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('male');
    const [activity, setActivity] = useState('1.2');
    const [result, setResult] = useState(null);

    const calculateBMI = () => {
        const heightInMeters = parseFloat(height) / 100;
        const weightInKg = parseFloat(weight);
        const ageInYears = parseInt(age);
        const activityFactor = parseFloat(activity);

        if (heightInMeters && weightInKg) {
            const bmi = weightInKg / (heightInMeters * heightInMeters);
            let bmiStatus = '';

            if (bmi < 18.5) {
                bmiStatus = 'Underweight';
            } else if (bmi >= 18.5 && bmi < 24.9) {
                bmiStatus = 'Healthy';
            } else if (bmi >= 25 && bmi < 29.9) {
                bmiStatus = 'Overweight';
            } else {
                bmiStatus = 'Obese';
            }

            const bmr = (sex === 'male'
                ? 10 * weightInKg + 6.25 * heightInMeters * 100 - 5 * ageInYears + 5
                : 10 * weightInKg + 6.25 * heightInMeters * 100 - 5 * ageInYears - 161);

            const bmrWithActivity = bmr * activityFactor;

            setResult(`You are ${bmiStatus}! Your BMI is ${bmi.toFixed(2)}. BMR ${bmr.toFixed(2)}kcal/day, and BMR w/Activity Factor ${bmrWithActivity.toFixed(2)}kcal/day`);
        }
    };

    const closeResult = () => {
        setResult(null);
    };

    return (
        <div className="section1">
            <div className="container2">
                <div className="bmi-section">
                    <h1>YOUR BMI</h1>
                    <table>
                        <thead>
                            <tr>
                                <th><strong>BMI</strong></th>
                                <th><strong>WEIGHT STATUS</strong></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Below 18.5</td>
                                <td>Underweight</td>
                            </tr>
                            <tr>
                                <td>18.5 - 24.9</td>
                                <td>Healthy</td>
                            </tr>
                            <tr>
                                <td>25.0 - 29.9</td>
                                <td>Overweight</td>
                            </tr>
                            <tr>
                                <td>30.0 and Above</td>
                                <td>Obese</td>
                            </tr>
                        </tbody>
                    </table>
                    <p>BMR Metabolic Rate / BMI Body Mass Index</p>
                </div>
                <div className="form-section">
                    <h2>Calculate Your BMI</h2>
                    <form>
                        <div className=".hamisi {
">
                            <div className="form-group biriki">
                                <label htmlFor="height">Height / cm</label>
                                <input placeholder='175' type="string" id="height" value={height} onChange={(e) => setHeight(e.target.value)} required />


                                <label htmlFor="weight">Weight / kg</label>
                                <input placeholder="55" type="string" id="weight" value={weight} onChange={(e) => setWeight(e.target.value)} required />
                            </div>


                            <div className="form-group ucdord">
                                <label htmlFor="age">Age</label>
                                <input placeholder='35' type="string" id="age" value={age} onChange={(e) => setAge(e.target.value)} required />


                                <label htmlFor="sex">Sex</label>
                                <select id="sex" value={sex} onChange={(e) => setSex(e.target.value)}>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="activity">Select an Activity Factor:</label>
                            <select id="activity" value={activity} onChange={(e) => setActivity(e.target.value)}>
                                <option value="1.2">Little or no exercise / Desk job</option>
                                <option value="1.375">Light exercise / Sports 1-3 days a week</option>
                                <option value="1.55">Moderate exercise / Sports 3-5 days a week</option>
                                <option value="1.725">Hard exercise / Sports 6-7 days a week</option>
                                <option value="1.9">Very hard exercise / Physical job</option>
                            </select>
                        </div>
                        <button type="button" onClick={calculateBMI}>Calculate</button>
                    </form>
                    {result && (
                        <div id="result" className="result">
                            <span>{result}</span>
                            <button onClick={closeResult}>X</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BMICalculator;
