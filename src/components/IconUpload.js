import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Upload, Icon } from 'antd';
import { toBase64Url } from '../lib/util/strings';

const IconUpload = ({ onChange, files }) => {
  const [isEncoding, setIsEncoding] = useState(false);
  const [fileList, setFileList] = useState(files);
  const toBase64 = (file, cb) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (e) => {
      const base64Data = e.target.result.substr(
        e.target.result.indexOf('base64,') + 'base64,'.length,
      );
      cb(base64Data);
    };
  };

  const props = {
    // cannot handle multiple files at the same time because of async nature
    // of customRequest toBase64 function
    multiple: false,
    listType: 'picture-card',
    accept: 'image/*',
    showUploadList: {
      showPreviewIcon: false,
      showDownloadIcon: false,
      showRemoveIcon: true,
    },
    fileList: fileList.map((f) => ({ ...f, url: toBase64Url(f.url, f.type) })),
    onRemove(file) {
      const update = fileList.filter((f) => f.uid !== file.uid);
      onChange(update);
      setFileList(update);
    },
    customRequest({ file, onSuccess }) {
      setIsEncoding(true);
      console.log(file);
      toBase64(file, (str) => {
        onSuccess(true, file);
        const updatedFile = {
          uid: file.uid,
          size: file.size,
          name: file.name,
          url: str,
          type: file.type,
        };
        onChange([...fileList, updatedFile]);
        setFileList([...fileList, updatedFile]);
        setIsEncoding(false);
      });
      return true;
    },
  };

  return (
    <Upload {...props} isEncoding={isEncoding}>
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    </Upload>
  );
};

IconUpload.propTypes = {
  files: PropTypes.array,
  onChange: PropTypes.func,
};

IconUpload.defaultProps = {
  files: [],
  onChange: () => {},
};

export default IconUpload;
