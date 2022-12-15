import { Modal,Button } from 'antd';
import React from 'react';
import CardInfo from '../CardInfo/CardInfo';

function ModalInfo({ visible, toggleVisible, info, setReview }) {
   
    const footerButton = () => {
        return <Button onClick={()=>toggleVisible(false)} key="1">Cancel</Button>;  
    };
    return (
        <Modal
            title="Review Info"
            centered
            visible={visible}
            onCancel={() => { toggleVisible(false); }}
            footer={footerButton()}
            width={1000}
        >
            <div className="create-info__right">
                <div className="create-right__info" style={{display: 'flex'}}>
                    <CardInfo info={info} setReview={setReview} toggleVisible={toggleVisible}/>
                </div>
            </div>
        </Modal>
    );
}

export default ModalInfo;