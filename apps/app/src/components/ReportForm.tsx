import { useState } from 'react';
import {
  Textarea,
  Input,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from 'ui';

const tagsList = [
  '路障',
  '動物',
  '事故',
  '修路',
  '壅塞',
  '天氣',
  '施工',
  '其他',
];

export const ReportForm = ({ isOpen, setIsOpen, handleCreateReport }: any) => {
  const [newReportContent, setNewReportContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const toggleTag = (tag: string) =>
    setSelectedTags(prevTags =>
      prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag],
    );
  const resetForm = () => {
    setNewReportContent('');
    setSelectedTags([]);
    setImageFile(null);
    setIsOpen(false);
  };

  const handleSubmit = () => {
    handleCreateReport({
      content: newReportContent,
      tags: selectedTags,
      image: imageFile,
    });

    resetForm();
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent style={{ maxWidth: '400px', padding: '20px' }}>
        <DialogHeader>
          <DialogTitle>新增報告</DialogTitle>
          <DialogDescription>
            請輸入報告內容，也可以選擇相關圖片
          </DialogDescription>
        </DialogHeader>
        <Textarea
          placeholder='輸入報告內容'
          value={newReportContent}
          onChange={e => setNewReportContent(e.target.value)}
          className='mb-4'
          style={{ height: '200px' }}
        />
        <Input
          type='file'
          onChange={e => setImageFile(e.target.files![0])}
          className='mb-4'
        />
        <p className='mb-4'>標籤</p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginBottom: '32px',
          }}
        >
          {tagsList.map(tag => (
            <Button
              key={tag}
              onClick={() => toggleTag(tag)}
              style={{
                backgroundColor: selectedTags.includes(tag)
                  ? '#5AB4C5'
                  : '#e5e5e5',
                color: selectedTags.includes(tag) ? '#fff' : '#000',
              }}
            >
              {tag}
            </Button>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleSubmit}>提交</Button>
          <Button onClick={resetForm} style={{ marginLeft: '10px' }}>
            取消
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
