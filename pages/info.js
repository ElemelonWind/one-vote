import { useState, useEffect } from 'react';
import Address from '@/components/Address';
import Loading from '@/components/Loading';
import Image from 'next/image';

export default function Info() {
    const [address, setAddress] = useState('');
    const [voterData, setVoterData] = useState([]);

    useEffect(() => {
        if (!address || voterData.length) return;

        const fetchVoterData = async () => {
            console.log('fetching voter data')
            const response = await fetch('/api/reps', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ address })
            });

            const data = await response.json();

            if (response.status !== 200) {
                return;
            }

            setVoterData(data.message);
        }

        fetchVoterData();
    }, [address, voterData]);

    if (!address) {
        return <Address setAddress={setAddress} />;
    }

    if (!voterData.length) {
        return (
            <div className="info-page">
                <Loading />
            </div>
        );
    }

    return (
        <div className="info-page" style={{backgroundColor: "#2C2C2C"}}>
            <title>OneVote</title>
            <div className = "image" >
        <Image src = "/Logo_V2-Transparent.png" width = {250} height = {250}
        onClick={
            () => {
                window.location.href = "/"
            }
        } style={{cursor: "pointer"}} />
      </div>
            <h1 className="title">Voter Information</h1>
            <div className="candidates2">
                <div className="containerChild">
                <div className="candidates">
                    <h2 className="text"> Meet Your Representatives </h2>
                    {voterData.map((rep, index) => (
                <a key={index} href={rep.url} target="_blank">
                    <p className="position">{rep.name} - {rep.party}</p>
                    <p className="name"> {rep.title} </p>
                </a>
            ))} 
                </div>

                {/* <div class="polls">
                    <h2 class="text"> Polling Stations Near You </h2>
                </div> */}
                </div>
                <div className="containerChild">
                <div className="current-elections">
                    <h2 className="text"> Elections in Your Area </h2>
                    <p className="text-center mt-5"> No upcoming elections in your area </p>
                </div>
                 <div class="to-do">

                    <h2 class="text"> More Information </h2>
                    
                    <a href="https://www.usa.gov/register-to-vote"><img src="https://cdn3.emoji.gg/emojis/4069_gray_square.png" className="inline-flex" width="16px" height="16px" margin="10px" alt="gray_square"></img><span className="inline-flex">Learn how to register to vote!</span></a>
                    <br></br>
                    <a href="https://www.usa.gov/how-to-vote"><img src="https://cdn3.emoji.gg/emojis/4069_gray_square.png" className="inline-flex" width="16px" height="16px" margin="10px" alt="gray_square"></img><span className="inline-flex">Get more voting information here!</span></a>

            
                    {/*}  <h2 class="text"> TO-DO </h2>
                        <p class="text"> <a href="#"> &#x2705 Register to vote! </a> </p>
                        <p class="text"> <a href="#"> &#x2705 Vote by November 3, 2024! </a> </p> */}
                    </div> 
                </div>
            </div>
            



        </div>
    );
}