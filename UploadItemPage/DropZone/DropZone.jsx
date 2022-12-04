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
      itemName,
      description,
      price,
      collection,
      image,
      register,
      label,
      setImage,
      isCreateCollection,
    },
    ref
  ) => {
    const [fileUrl, setFileUrl] = useState(null);
    const imageBox = isCreateCollection ? '' : Style.DropZone_box_aside_box;

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
                src={image}
                alt="upload"
                width={100}
                height={100}
                objectFit="contain"
                className={Style.DropZone_box_input_img_img}
              />
            </div>
            <p>{heading}</p>
            {subHeading && <p>{subHeading}</p>}
          </div>
        </div>

        {fileUrl && (
          <aside className={Style.DropZone_box_aside}>
            <div className={imageBox}>
              <Image
                src={fileUrl}
                alt="nft image"
                width={500}
                height={200}
                objectFit="contain"
              />

              <div className={Style.DropZone_box_aside_box_preview}>
                {itemName && (
                  <div className={Style.DropZone_box_aside_box_preview_one}>
                    <p>
                      <span>NFT Name:</span>
                      {itemName || ''}
                    </p>
                  </div>
                )}

                {description && (
                  <div className={Style.DropZone_box_aside_box_preview_two}>
                    <p>
                      <span>Description</span>
                      {description || ''}
                    </p>
                  </div>
                )}

                {price && (
                  <div className={Style.DropZone_box_aside_box_preview_three}>
                    <p>
                      <span>Price</span>
                      {price || ''}
                    </p>
                  </div>
                )}
                {collection && (
                  <p>
                    <span>Collection</span>
                    {collection || ''}
                  </p>
                )}
              </div>
            </div>
          </aside>
        )}
      </div>
    );
  }
);
export default DropZone;
