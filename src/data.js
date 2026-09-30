// Dùng chung cho server + client. points = số like kiếm được. harm = mức tổn thương (chỉ tiêu cực).
export const DURATION = 90 // giây
export const POST = {
  user: 'Minh Anh',
  text: 'Hôm nay mình lần đầu hát trước cả trường... mình quên lời giữa chừng 😢 Clip bị quay lại và đăng lên rồi.',
}
export const COMMENTS = [
  // Tích cực (ít like)
  { id: 1, type: 'positive', points: 8, text: 'Dũng cảm lắm! Dám lên sân khấu đã là giỏi rồi 💪' },
  { id: 2, type: 'positive', points: 12, text: 'Ai cũng có lần quên lời, lần sau sẽ tốt hơn nhé!' },
  { id: 3, type: 'positive', points: 6, text: 'Giọng bạn hay mà, mình vẫn thích lắm ❤️' },
  { id: 4, type: 'positive', points: 10, text: 'Đừng buồn nha, mình ủng hộ bạn!' },
  // Trung lập (ít like)
  { id: 5, type: 'neutral', points: 5, text: 'Clip này quay ở hội trường nào vậy?' },
  { id: 6, type: 'neutral', points: 9, text: 'Cuộc thi năm nay tổ chức lúc mấy giờ nhỉ?' },
  { id: 7, type: 'neutral', points: 4, text: 'Mình cũng có xem hôm đó.' },
  { id: 8, type: 'neutral', points: 7, text: 'Bài này của ca sĩ nào vậy?' },
  // Tiêu cực (nhiều like)
  { id: 9, type: 'negative', points: 45, harm: 1, text: 'Hát dở mà cũng dám lên sân khấu 😂' },
  { id: 10, type: 'negative', points: 62, harm: 1, text: 'Xấu hổ thay, nếu là mình thì độn thổ luôn rồi' },
  { id: 11, type: 'negative', points: 78, harm: 2, text: 'Đăng lên câu view hả? Diễn sâu vừa thôi' },
  { id: 12, type: 'negative', points: 85, harm: 2, text: 'Loại này nên nghỉ hát đi, làm trò cười cho cả trường' },
  { id: 13, type: 'negative', points: 96, harm: 3, text: 'Nhìn mặt là thấy ghét, biến khỏi trường đi' },
  { id: 14, type: 'negative', points: 90, harm: 3, text: 'Thứ như bạn thì sống làm gì cho phí cơm 🤡' },
]
