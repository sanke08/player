"use client";

import { UploadButton } from "@/utils/uploadthings";

interface Props {
    onchange: any
    endpoint: any
}

export default function FileUploader({ onchange, endpoint }: Props) {
    return (
        <div className="">
            <UploadButton
                endpoint={endpoint} 
                onClientUploadComplete={(res: any) => onchange(res?.[0].fileUrl)} 
                onUploadError={(error: any) => { console.log(error) }}
            />
        </div>
    );
}