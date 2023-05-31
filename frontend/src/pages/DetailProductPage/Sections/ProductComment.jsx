import React, { useState } from 'react';

import axiosInstance from '../../../utils/axios';
import { Modal } from 'antd';
import { useNavigate } from 'react-router';
import { getDate } from '../../../components/Date';
const ProductComment = ({ userData, comments, product }) => {
  console.log(comments);
  const navigate = useNavigate();
  const [currentid, setCurrentId] = useState('');
  const [isopen, setIsOpen] = useState(false);
  const [mention, setMention] = useState('');
  const [updateMention, setUpdateMention] = useState('');

  const showUpdateModal = id => {
    setIsOpen(true);
    setCurrentId(id);
  };
  const handleCancel = () => {
    setIsOpen(false);
  };
  const handleChange = e => {
    setMention(e.target.value);
  };
  const handleUpdateChange = e => {
    setUpdateMention(e.target.value);
  };
  const uploadComment = async () => {
    if (!mention) {
      alert('댓글을 입력하세요');
      return;
    }
    const body = {
      writer: userData.id,
      productId: product._id,
      comment: mention,
    };
    try {
      await axiosInstance.post(`/comments`, body);
      alert('댓글 입력완료!');
      navigate(0);
    } catch (error) {
      console.error(error);
    }
  };
  //   const updateComment = async (e) => {
  //     const body={
  //         comment: mention
  //     }
  //     try{
  //         await axiosInstance.patch(`/comments/${e.target._id}`, body)
  //     }
  //   }
  const updateComment = async (id, itemComment) => {
    setIsOpen(false);
    if (itemComment === updateMention) {
      return;
    }
    const body = {
      comment: updateMention,
    };
    try {
      await axiosInstance.patch(`/comments/${id}`, body);
      alert('수정완료!');
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteComment = async id => {
    try {
      await axiosInstance.delete(`/comments/${id}`);
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <textarea
        className='w-full h-[200px] mt-3 pl-3 border'
        onChange={handleChange}
        value={mention}
      />
      <button
        className='w-full rounded-md bg-gray-200 px-2 py-1 text-xl  font-bold text-gray-600 ring-1 ring-inset ring-gray-500/10'
        onClick={uploadComment}>
        댓글 등록
      </button>
      <div>
        {comments.map(item => (
          <div key={item._id} className='p-10 mt-5 bg-gray-200'>
            <div className='flex justify-between'>
              <div className='flex '>
                <img
                  className='h-10 w-10 rounded-full mr-3'
                  src={item.writer.image}
                  alt='사용자이미지'
                />
                <div className='text-base font-bold mr-3'>{item.writer.name}</div>
                <span>{getDate(item.createdAt)}</span>
              </div>
              <div>
                <div>
                  {userData.id === item.writer._id ? (
                    <>
                      <button
                        className='inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 mr-3'
                        onClick={() => showUpdateModal(item._id)}>
                        수정하기
                      </button>
                      <button
                        className='inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10'
                        onClick={() => deleteComment(item._id)}>
                        삭제하기
                      </button>
                      <>
                        {' '}
                        <Modal
                          title='댓글 수정'
                          open={isopen}
                          onOk={() => updateComment(currentid, item.comment)}
                          onCancel={handleCancel}>
                          <textarea
                            className='w-96 h-60 mt-3 bg-gray-200'
                            onChange={handleUpdateChange}
                            value={updateMention}
                          />
                        </Modal>
                      </>
                    </>
                  ) : null}
                </div>
              </div>
            </div>

            <div className='mt-2 ml-12 mb-20'>{item.comment}</div>
            <hr
              style={{
                color: 'gray',
                backgroundColor: 'gray',
                height: 3,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductComment;
