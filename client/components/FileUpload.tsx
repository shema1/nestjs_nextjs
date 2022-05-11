import React, { BaseSyntheticEvent, ReactNode, useRef } from 'react'

interface FileUploadProps {
  setFile: Function;
  accept: string,
  children: ReactNode
}

const FileUpload: React.FC<FileUploadProps> = ({ setFile, accept, children }) => {

  const ref = useRef<HTMLInputElement>()

  const onClick = () => {
    ref.current.click()
  }


  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files[0])
  }

  return (
    <div onClick={onClick} style={{ height: "100%" }}>
      <input type="file"
        onChange={onChangeImage}
        accept={accept}
        style={{ display: "none" }}
        ref={ref} />
      {children}
    </div>
  )
}

export default FileUpload