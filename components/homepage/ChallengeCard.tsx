import styles from './css/ChallengeCard.module.scss'
import { Rating } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image'
import { BiUser } from "react-icons/bi";
import { ChallengeCardData } from '../../types/DataType';

export default function ChallengeCard(data: ChallengeCardData) {
    
    return (
        // Each challenge card routes to its own challenge page
        <Link
            id={"ChallengeCard"}
            href={{
                pathname: '/challenge',
                query: { id: data.challengeID },
            }} 
            className='no-underline'>

            {/* Challenge Card */}
            <div className={styles['ChallengeCard']}>
                {/* Background Image */}
                <Image
                    src={data.bannerImg}
                    alt={'test'}
                    fill
                    className={styles['Img']}
                />
                {/* Challenge Info */}
                <div className={styles['BottomHalf']}>
                    <div className={styles['Top']}>
                        <div className={styles['Left']}>
                            <div className={styles['ChallengeName'] + ' H3'}>
                                {data.challengeTitle}
                            </div>
                            <Rating
                                name="simple-controlled"
                                value={data.rating}
                                readOnly
                            />
                        </div>
                        <div> 
                            <div className='flex space-x-4'>
                                <div className={styles['Type'] + ' TextMedium'}>Type: {data.type}</div>
                                <div className={styles['Type'] + ' TextMedium'}>Format: {data.format}</div>
                                <div className={styles['Type'] + ' TextMedium'}>Date: {data.startDate} - {data.endDate}</div>
                            </div>
                        </div>
                    </div>

                    <div className={styles['Bottom']}>
                        <div className={styles['ChallengeDescription']}>
                            <div className={styles['Description'] + ' TextRegular'}>
                                {data.description}
                            </div>
                        </div>

                        {/* ChallengeStatus : Number of participants , Open/Closed */}
                        <div className={styles['ChallengeStatus']}>
                            {
                                data.joined &&
                                <div className={styles['Joined'] + ' TextBold'}>
                                    Joined
                                </div>
                            }
                            <BiUser className={styles['Icon']} />
                            <div className={styles['NumParticipants'] + ' TextBold'}>
                                {data.numParticipants} / {data.maxParticipants}
                            </div>
                            {
                                data.closed &&
                                <div className={styles['Closed'] + ' TextBold'}>
                                    Closed
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Link>

    )
}