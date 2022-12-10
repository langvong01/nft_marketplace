import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import ErrorMsg from '../../CreateNftItem/FormControll/ErrorMessage/ErrorMessage';

//INTRNAL IMPORT
import Style from './DropZone.module.css';
import images from '../../img';

const DropZone = React.forwardRef(
  (
    {
      title,
      heading,
      subHeading,
      register,
      label,
      setImage,
    },
    ref
  ) => {
    const [fileUrl, setFileUrl] = useState(images.upload);

    // const imageBox = isCreateCollection  ? Style.DropZone_box_upload_collection : Style.DropZone_box_aside_box;

    const onDrop = useCallback(async (acceptedFile) => {
      const url = URL.createObjectURL(acceptedFile[0]);
      setFileUrl(url);
      setImage(acceptedFile[0]);
    });

    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: 'image/*',
      maxSize: 5000000,
    });

    return (
      <div className={Style.DropZone}>
        <div className={Style.DropZone_box} {...getRootProps()}>
          <input {...getInputProps()} ref={ref} {...register(label)} />
          <div className={Style.DropZone_box_input}>
            <p>{title}</p>
            <div className={Style.DropZone_box_input_img}>
              <Image
                src={fileUrl}
                alt="upload"
                width={600}
                height={600}
                objectFit="contain"
                className={Style.DropZone_box_input_img_img}
              />
            </div>
            <p>{heading}</p>
            {subHeading && <p>{subHeading}</p>}
          </div>
        </div>
      </div>
    );
  }
);
export default DropZone;
