import { TextField } from '@mui/material';
import collabStyle from '../css/Collabs.module.css';
import { useState } from 'react';
import styles from '../../challengecreation/css/CreationPage.module.css';
import { setConstantValue } from 'typescript';
import axios from 'axios';
import router, { useRouter } from 'next/router';
import { useEffect } from 'react';
import { UserData } from '../../../types/DataType';
import { useCallback } from 'react';
import { fetchChallengeData } from '../../../services/challenge.services';
type Collaborator = {
    id: string;
    name: string;
};
const c = {
    cnumber: 1,
    id: 630610762,
    name: 'Saranphot Chesrichai',
};
const c2 = {
    cnumber: 2,
    id: 630610763,
    name: 'oat699',
};

export default function Collaborators({ title, collaborators }: any) {
    const router = useRouter();
    const { challengeTitle } = router.query;

    const [emailInput, setEmailInput] = useState('');

    const [cols, setCols] = useState<UserData[]>([]);
    const removeCol = (cc: UserData) => {
        let j = {
            challengeTitle: title,
            cmuAccount: cc.cmuAccount,
        };
        axios.delete('http://localhost:3030/api/challenges/deleteCollaborators',j)
            .then((resp) =>{
                console.log("del reach db")
                console.log("del resp: ",resp)

                fetchChallengeData(challengeTitle as string).then(
                    (resp) => {
                        setCols(resp.collaborators);
                    },
                );
            })
            .catch((err)=>{
                
                console.log(err);

            })

        //     removeCol
        // }
        setCols(cols.filter((e) => e.userId !== cc.userId));
    };

    // const handleChange = (e:any) =>{
    //     setText(e.target.value.toString())
    // }
    // const addCol = useCallback(() => {}, [
    //     challengeTitle,
    //     cols,
    //     emailInput,
    //     title,
    // ]);

    const handleAdd = () => {
        console.log('call');
        let dupe = cols.map((c) => c.cmuAccount).includes(emailInput);
        if (!dupe) {
            console.log('yes');
            let j = {
                challengeTitle: title,
                cmuAccount: emailInput,
            };
            console.log('j= ', j);
            axios
                .put('http://localhost:3030/api/challenges/addCollaborators', j)
                .then((resp) => {
                    console.log(resp.data);
                    fetchChallengeData(challengeTitle as string).then(
                        (resp) => {
                            setCols(resp.collaborators);
                        },
                    );
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    useEffect(() => {}, [cols]);

    useEffect(() => {
        console.log(collaborators);
        setCols(collaborators);
    }, []);
    const iprop = {
        disableunderline: 'true',
    };

    return (
        <div className="w-full pb-2">
            <div className={styles.cr_HeadText + ' pb-2'}>Collaborators</div>
            <div className={collabStyle.tbox + ' w-full'}>
                <div className="w-full flex flex-row gap-1">
                    <div className="w-11/12">
                        <TextField
                            onChange={(e) => {
                                setEmailInput(e.target.value);
                            }}
                            placeholder="Please input your collaborator's email."
                            fullWidth
                            autoComplete="off"
                            inputProps={iprop}
                            value={emailInput}
                        ></TextField>
                    </div>

                    <button className="" onClick={() => handleAdd()}>
                        add
                    </button>
                </div>
                <div className={collabStyle.ttable + ' w-full'}>
                    <div className={collabStyle.thead}>
                        <div className={collabStyle.theadtext}>#</div>
                        <div className={collabStyle.theadtext}>
                            Participant ID
                        </div>
                        <div className={collabStyle.theadtext}>
                            Participant Name
                        </div>
                        <div className={collabStyle.theadtext}>Action</div>
                    </div>
                    {cols?.length > 0 &&
                        cols.map((co: UserData, index) => {
                            return (
                                <div className={collabStyle.tbody} key={index}>
                                    <div className={collabStyle.tbodytext}>
                                        {index + 1}
                                    </div>
                                    <div className={collabStyle.tbodytext}>
                                        {co.studentId}
                                    </div>
                                    <div className={collabStyle.tbodytext}>
                                        {co.displayName}
                                    </div>
                                    <button
                                        className=""
                                        onClick={() => removeCol(co)}
                                    >
                                        remove
                                    </button>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
