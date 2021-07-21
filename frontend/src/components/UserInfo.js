import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';

function UserInfo(props) {
    const [checked, setChecked] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
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


    const handleSubmit = (e) => {

        console.log('x')
    }

    console.log(user);

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
                <br/>
                Basketball 
                <Checkbox
                    id="basketball"
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                <br/>
                Tennis
                <Checkbox
                    id="tennis"
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                <br/>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default UserInfo;