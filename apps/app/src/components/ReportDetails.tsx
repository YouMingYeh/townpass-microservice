import { Report, Comment } from '../app/type';
import { Badge, Textarea, Input, Button } from 'ui';
import { useState, useEffect } from 'react';

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
  //   console.log("report: ", reports)
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
          gap: '8px',
        }}
      >
        {selectedReport.tags?.map((tag, index) => (
          <Badge
            key={index}
            style={{ backgroundColor: '#5AB4C5', color: '#fff' }}
          >
            {tag}
          </Badge>
        ))}
      </div>
      <h3>留言區</h3>
      {comments.map((comment, index) => (
        <div key={index}>
          <p>
            <strong>{comment.username}</strong> ({comment.time}):{' '}
            {comment.content}
          </p>
          {comment.image && (
            <img src={comment.image} alt='Comment' style={{ width: '100px' }} />
          )}
        </div>
      ))}
      <div style={{ marginTop: '20px' }}>
        <h3>新增留言</h3>
        <Textarea
          placeholder='輸入您的留言...'
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          className='mb-2'
        />
        <Input
          type='file'
          onChange={e => setImageFile(e.target.files![0])}
          className='mb-2'
        />
        <Button onClick={handleCommentSubmit}>送出留言</Button>
      </div>
      <div style={{ marginTop: '40px' }}>
        <h3>附近發生了什麼🤔</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
            marginTop: '16px',
          }}
        >
          {reports.slice(0, 10).map((report, index) => (
            <div
              key={report.id}
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                cursor: 'pointer',
              }}
              onClick={() => setSelectReport(report)}
            >
              <p>
                <strong>{report.username}</strong>
              </p>
              <p>{report.content || '無原因'}</p>
              {report.image && (
                <img
                  src={report.image}
                  alt='Nearby report'
                  style={{ width: '100%', height: '100px', objectFit: 'cover' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
