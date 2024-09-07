import { Report, Comment } from '../app/type';
import { Badge, Textarea, Input, Button, Separator } from 'ui';
import { useState, useRef } from 'react';

interface ReportDetailsProps {
  selectedReport: Report;
  comments: Comment[];
  newComment: string;
  setNewComment: (value: string) => void;
  handleCommentSubmit: () => void;
  reports: Report[];
  setSelectReport: (report: Report) => void;
}

export const ReportDetails = ({
  selectedReport,
  comments,
  newComment,
  setNewComment,
  handleCommentSubmit,
  reports,
  setSelectReport,
}: ReportDetailsProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const portfolioRef = useRef<HTMLDivElement | null>(null);

  const scrollToPortfolio = () => {
    if (portfolioRef.current) {
      portfolioRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  console.log('selectedReport:', selectedReport);
  return (
    <div style={{ padding: '20px' }}>
      <p className='text-2xl'>{selectedReport.emoji}</p>
      <h2 className='text-2xl font-bold'>報告詳細資訊</h2>

      <p>
        <strong>使用者：</strong> {selectedReport.username}
      </p>
      <p>
        <strong>原因：</strong> {selectedReport.content || '無原因'}
      </p>
      {selectedReport.image && (
        <img
          src={selectedReport.image}
          alt='Report'
          style={{ width: '100%' }}
        />
      )}
      <p>
        <strong>地址：</strong>
        {selectedReport.location?.address || '沒有地址'}
      </p>
      <div
        style={{
          marginTop: '10px',
          display: 'flex',
          flexWrap: 'wrap',
          marginLeft: '0px',
        }}
      >
        {selectedReport.tags?.map((tag, index) => (
          <Badge
            key={index}
            style={{
              backgroundColor: '#5AB4C5',
              color: '#fff',
              borderRadius: '15px',
              padding: '4px',
              paddingLeft: '8px',
              paddingRight: '8px',
              marginRight: '6px',
            }}
          >
            {tag}
          </Badge>
        ))}
      </div>
      <Separator className='my-4' />
      <h2 className='text-2xl font-bold'>留言區</h2>
      {comments.map((comment, index) => (
        <div key={index}>
          <p>
            <strong>{comment.username}</strong> ({comment.timestamp}):{' '}
            {comment.content}
          </p>
          {comment.image && (
            <img src={comment.image} alt='Comment' style={{ width: '100px' }} />
          )}
        </div>
      ))}
      <div style={{ marginTop: '20px' }}>
        <Textarea
          placeholder='輸入您的留言...'
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          className='mb-2'
        />
        <Input
          type='file'
          onChange={e => setImageFile(e.target.files![0])}
          style={{
            paddingLeft: '0px',
            border: 'none',
            boxShadow: 'none',
            outline: 'none',
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleCommentSubmit}>送出留言</Button>
        </div>
      </div>
      <div style={{ marginTop: '40px' }} className='p-4 overflow-auto'>
            <h2 className='text-2xl font-bold'>附近發生了什麼🤔</h2>
            <div className='mt-4 flex flex-1 flex-col gap-4'>
              {reports.slice(0, 10).map((report, index) => (
                <div
                  key={report.report_id}
                  className='cursor-pointer border border-border rounded shadow p-4'
                  onClick={() => {
                    setSelectReport(report);
                  }}
                >
                  <div>
                    <p className='text-2xl'>{report.emoji || '🙂'}</p>
                    <h2 className='text-xl font-bold'>{report.username}</h2>
                    <p>{report.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
    </div>
  );
};
