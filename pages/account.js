import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import * as cookie from 'cookie';

//INTERNAL IMPORT
import Style from '../styles/account.module.css';
import FormStyle from '../AccountPage/Form/Form.module.css';

import images from '../img';
import Banner from '@/components/banner/Banner';
import Input from 'CreateNftItem/FormControll/input';
import { useForm } from 'react-hook-form';
import axiosClient from '../utils/axiosClient';
import InputWithIcon from 'CreateNftItem/FormControll/InputWithIcon/inputIcon';
import Button from '@/components/Button/Button';
import { useRecoilState } from 'recoil';
import { connectMetaMaskState } from 'global-state/connect-metamask';
//extrenal IMPORT
import { HiOutlineMail } from 'react-icons/hi';
import { useRouter } from 'next/router';
import { MdOutlineContentCopy, MdOutlineHttp } from 'react-icons/md';

const account = ({}) => {
  const [fileUrl, setFileUrl] = useState(null);

  const [profile, setProfile] = useState({
    avatar: null,
    name: '',
    email: '',
  });

  const router = useRouter();

  //fetch gloal state
  const [recoil, setRecoil] = useRecoilState(connectMetaMaskState);
  const { accountCurrent } = recoil;

  const fetchAccountProfile = async () => {
    try {
      const {
        data: {
          body: { avatar, name, email },
        },
      } = await axiosClient.get(`/profile/${accountCurrent}`);

      setProfile({
        ...profile,
        name,
        email,
      });
      setFileUrl(avatar);
    } catch (error) {}
  };
  useEffect(() => {
    fetchAccountProfile();
  }, [accountCurrent]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const onDrop = useCallback(async (acceptedFile) => {
    const url = URL.createObjectURL(acceptedFile[0]);
    setFileUrl(url);
    setProfile({
      ...profile,
      avatar: acceptedFile[0],
    });
  }, []);

  const onSubmitHandle = async (data) => {
    if (!fileUrl) {
      alert('Please upload avatar image ');
      return;
    }
    const { name, email } = data;
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('avatar', profile.avatar);
      const respone = await axiosClient.post(`/profile`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      router.push(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxSize: 5000000,
  });

  return (
    <div className={Style.account}>
      <div className={Style.account_banner}>
        <Banner bannerImage={fileUrl ? fileUrl : images.upload}></Banner>
      </div>
      <div className={Style.account_info}>
        <h1>Account Details</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmitHandle)}>
        <div className={Style.account_box}>
          <div className={Style.account_box_img} {...getRootProps()}>
            <input {...getInputProps()} />
            <Image
              loader={() => fileUrl}
              src={fileUrl ? fileUrl : images.upload}
              alt="account upload"
              width={150}
              height={150}
              objectFit="cover"
              className={Style.account_box_img_img}
            />
            <p className={Style.account_box_img_para}>Change Image</p>
          </div>
          <div className={Style.account_box_form}>
            <Input
              initialValue={profile.name}
              label="name"
              register={register}
              type="text"
              errors={errors}
            />
            <InputWithIcon
              initialValue={profile.email}
              label="email"
              register={register}
              type="text"
              errors={errors}
              icon={<HiOutlineMail />}
            />

            {/* Wallet Address fake input  */}
            <div className={FormStyle.Form_box_input}>
              <label htmlFor="wallet">Wallet address</label>
              <div className={FormStyle.Form_box_input_box}>
                <div className={FormStyle.Form_box_input_box_icon}>
                  <MdOutlineHttp />
                </div>
                <input
                  type="text"
                  readOnly
                  defaultValue={accountCurrent}
                />
                <div className={FormStyle.Form_box_input_box_icon}>
                  <MdOutlineContentCopy />
                </div>
              </div>
            </div>
            <div className={Style.account_box_btn}>
              <Button
                btnName="Upload profile"
                handleClick={() => handleSubmit(onSubmitHandle)}
                classStyle="w-100"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default account;

export async function getServerSideProps(context) {
  const parsedCookies = cookie.parse(context.req.headers.cookie);

  const { at, rt } = parsedCookies;
  if (!at && !rt) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
}
