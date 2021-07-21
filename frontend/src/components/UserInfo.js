import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


function UserInfo(props) {
    const [checked, setChecked] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const [level, setLevel] = useState('');
    const [level2, setLevel2] = useState('');
    const [level3, setLevel3] = useState('');


    const [user, setUser] = useState({
        name: '',
        country: '',
        sports: [
            {
                soccer: false,
                level: ''
            },
            {
                basketball: false,
                level: ''
            },
            {
                tennis: false,
                level: ''
            }
        ]
    });


    const handleChange = (e) => {
        if (e.target.name === 'name') {
            let u = {...user};
            u.name = e.target.value;
            setUser(u);
        }
        if (e.target.name === 'country') {
            let u = {...user};
            u.country = e.target.value;
            setUser(u);
        }

        if (e.target.id == 'soccer') {
            let u = {...user};

            if (checked) {
                setChecked(false);
                u.sports[0].soccer = false;
                setUser(u);
            } else {
                setChecked(true)
                u.sports[0].soccer = true;
                setUser(u);
            };
        }

        if (e.target.id == 'basketball') {
            let u = {...user};

            if (checked2) {
                setChecked2(false);
                u.sports[1].basketball = false;
                setUser(u);
            } else {
                setChecked2(true)
                u.sports[1].basketball = true;
                setUser(u);
            };
        }

        if (e.target.id == 'tennis') {
            let u = {...user};

            if (checked3) {
                setChecked3(false);
                u.sports[2].tennis = false;
                setUser(u);
            } else {
                setChecked3(true)
                u.sports[2].tennis = true;
                setUser(u);
            };
        }
    }

    const handleChange2 = (e) => {
        let u = {...user};

        if (e.target.name === 'soccer') {
            setLevel(e.target.value);
            u.sports[0].level = e.target.value;
            setUser(u);
        } else if (e.target.name === 'basketball') {
            setLevel2(e.target.value);
            u.sports[1].level = e.target.value;
            setUser(u);
        } else {
            setLevel3(e.target.value);
            u.sports[2].level = e.target.value;
            setUser(u);
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        // axios.post('http://localhost:5000/addUser')
        console.log(user)
    }


    return (
        <div>
            <form className="UserInfo" onSubmit={handleSubmit}>
                <TextField
                    label="name"
                    name="name"
                    id="filled-size-small"
                    variant="filled"
                    size="small"
                    onChange={handleChange}
                />
                <br/>
                <TextField
                    label="country"
                    name="country"
                    id="filled-size-small"
                    variant="filled"
                    size="small"
                    onChange={handleChange}
                />
                <br/>
                Soccer 
                <Checkbox
                    id="soccer"
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="soccer"
                value={level}
                onChange={handleChange2}
                >
                    <MenuItem value='beginner'>beginner</MenuItem>
                    <MenuItem value='intermediate'>intermediate</MenuItem>
                    <MenuItem value='advanced'>advanced</MenuItem>
                </Select>
                <br/>
                Basketball 
                <Checkbox
                    id="basketball"
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="basketball"
                    value={level2}
                    onChange={handleChange2}
                >
                    <MenuItem value='beginner'>beginner</MenuItem>
                    <MenuItem value='intermediate'>intermediate</MenuItem>
                    <MenuItem value='advanced'>advanced</MenuItem>
                </Select>
                <br/>
                Tennis                
                <Checkbox
                    id="tennis"
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="tennis"
                    value={level3}
                    onChange={handleChange2}
                >
                    <MenuItem value='beginner'>beginner</MenuItem>
                    <MenuItem value='intermediate'>intermediate</MenuItem>
                    <MenuItem value='advanced'>advanced</MenuItem>
                </Select>
                <br/>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default UserInfo;