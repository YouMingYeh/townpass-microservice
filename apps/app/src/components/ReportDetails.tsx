import { Report, Comment } from '../app/type';
import { Badge, Textarea, Input, Button } from 'ui';

interface ReportDetailsProps {
  selectedReport: Report;
  comments: Comment[];
  newComment: string;
  setNewComment: (value: string) => void;
  handleCommentSubmit: () => void;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ReportDetails = ({
  selectedReport,
  comments,
  newComment,
  setNewComment,
  handleCommentSubmit,
  handleImageUpload,
}: ReportDetailsProps) => (
  <div style={{ padding: '20px' }}>
    <h2>報告詳細資訊</h2>
    <p>
      <strong>使用者：</strong> {selectedReport.username}
    </p>
    <p>
      <strong>原因：</strong> {selectedReport.reason || '無原因'}
    </p>
    {selectedReport.image && (
      <img src={selectedReport.image} alt='Report' style={{ width: '100%' }} />
    )}
    <p>
      <strong>位置：</strong> ({selectedReport.location?.lat},{' '}
      {selectedReport.location?.lng})
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
      <Input type='file' onChange={handleImageUpload} className='mb-2' />
      <Button onClick={handleCommentSubmit}>送出留言</Button>
    </div>
  </div>
);
