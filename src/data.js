// Dùng chung cho server + client. points = số like kiếm được. harm = mức tổn thương (chỉ tiêu cực).
export const DURATION = 90 // giây
export const COOLDOWN_MS = 1000 // thời gian chờ giữa 2 bình luận của cùng 1 người

export const POST = {
  victim: "Minh Anh",
  user: 'Hoàng Nam',
  text: 'Cảnh báo mọi người!!! Nghe nói "Minh Anh" lớp 11A2 ăn cắp tiền quỹ lớp của mấy bạn trong tổ, xong còn lên mặt dạy đời người khác. Mình đọc được trên group kín, ai quen thì né gấp nha 😱 Chia sẻ cho mọi người cùng biết!',
}

export const COMMENTS = [
  // ===== TÍCH CỰC / BẢO VỆ (ít like) =====
  { id: 1, type: 'positive', points: 8, text: 'Bạn có bằng chứng chưa mà đăng vậy? Vu khống người khác là phạm luật đó.' },
  { id: 2, type: 'positive', points: 13, text: 'Mình học cùng tổ với Minh Anh, quỹ lớp bạn ấy giữ và ghi chép rõ ràng. Đừng bịa đặt nha.' },
  { id: 3, type: 'positive', points: 7, text: 'Tin kiểu này phải có bằng chứng, không thì là bôi nhọ danh dự người ta đó bạn.' },
  { id: 4, type: 'positive', points: 11, text: 'Bạn đang phát tán tin chưa kiểm chứng, nhỡ sai thì bạn phải chịu trách nhiệm đấy.' },
  { id: 5, type: 'positive', points: 9, text: 'Minh Anh không làm gì sai cả, bạn nên xin lỗi và xoá bài đi.' },
  { id: 6, type: 'positive', points: 15, text: 'Đừng lấy danh dự của người khác ra làm trò câu tương tác. Bạn đang làm hại người ta thật đấy.' },
  { id: 7, type: 'positive', points: 6, text: 'Nếu là mình bị vu oan vậy, mình cũng không chịu nổi đâu. Dừng lại đi.' },
  { id: 8, type: 'positive', points: 10, text: 'Ai có nguồn chính thống thì đưa ra, còn không thì đừng share.' },
  { id: 9, type: 'positive', points: 12, text: 'Mình đã báo cáo bài viết này rồi. Mong admin xử lý sớm.' },
  { id: 10, type: 'positive', points: 5, text: 'Người ta chưa bị kết luận gì mà bạn đã kết tội người ta rồi.' },
  { id: 11, type: 'positive', points: 14, text: 'Đây là hành vi bắt nạt qua mạng (cyberbullying), nghiêm trọng hơn bạn nghĩ đó.' },
  { id: 12, type: 'positive', points: 8, text: 'Bạn thử đặt mình vào vị trí Minh Anh xem, bạn có chịu nổi không?' },
  { id: 13, type: 'positive', points: 16, text: 'Lan truyền tin sai về người khác có thể bị xử lý hình sự đó, không đùa đâu.' },
  { id: 14, type: 'positive', points: 9, text: 'Minh Anh ơi, đừng đọc mấy comment này nha, bạn không một mình đâu ❤️' },
  { id: 15, type: 'positive', points: 7, text: 'Cả lớp mình biết tính Minh Anh, bạn ấy không phải người như vậy.' },

  // ===== TRUNG LẬP (ít like) =====
  { id: 16, type: 'neutral', points: 5, text: 'Group kín nào vậy bạn? Cho xin nguồn với.' },
  { id: 17, type: 'neutral', points: 8, text: 'Chuyện này có ai xác nhận chưa hay chỉ nghe kể lại vậy?' },
  { id: 18, type: 'neutral', points: 4, text: 'Mình cũng thấy bài này share nhiều mà chưa rõ thật giả.' },
  { id: 19, type: 'neutral', points: 7, text: 'Nếu đúng thì nghiêm trọng, mà nếu sai thì người đăng cũng mệt đó.' },
  { id: 20, type: 'neutral', points: 3, text: 'Trường mình có phòng tư vấn tâm lý không nhỉ, kiểu tin này ảnh hưởng ghê.' },
  { id: 21, type: 'neutral', points: 6, text: 'Hóng kết quả xác minh, chứ giờ chưa biết tin ai.' },
  { id: 22, type: 'neutral', points: 10, text: 'Bạn đăng bài này có kiểm chứng chưa? Hỏi thật lòng thôi.' },
  { id: 23, type: 'neutral', points: 5, text: 'Mình không quen cả hai bên nên không dám phán, chỉ hóng thôi.' },
  { id: 24, type: 'neutral', points: 9, text: 'Mọi người bình tĩnh, đợi nhà trường lên tiếng đã.' },
  { id: 25, type: 'neutral', points: 4, text: 'Bài này có vẻ bắt đầu từ mấy group drama, không rõ nguồn gốc.' },
  { id: 26, type: 'neutral', points: 6, text: 'Sao mình search không thấy thông tin chính thức nào về vụ này nhỉ?' },
  { id: 27, type: 'neutral', points: 7, text: 'Nếu là tin đồn thì người share cũng vô tình tiếp tay cho tin giả đó.' },
  { id: 28, type: 'neutral', points: 3, text: 'Thấy bài này bay khắp nơi rồi, không biết ai là người đầu tiên đăng.' },
  { id: 29, type: 'neutral', points: 8, text: 'Ai có bằng chứng thật thì post lên cho rõ, chứ nói suông khó tin lắm.' },
  { id: 30, type: 'neutral', points: 5, text: 'Có vẻ mọi người đang phản ứng hơi nhanh so với thông tin hiện có.' },

  // ===== TIÊU CỰC / BÔI XẤU (nhiều like) =====
  { id: 31, type: 'negative', points: 49, harm: 1, text: 'Ăn cắp là bản chất rồi, sau này ra đời cũng trộm cắp thôi.' },
  { id: 32, type: 'negative', points: 58, harm: 1, text: 'Nhà nghèo mà còn đạo đức giả, đúng kiểu thùng rỗng kêu to.' },
  { id: 33, type: 'negative', points: 67, harm: 2, text: 'Nghe nói nó còn nhiều phốt khác nữa, kiểu này thì cả trường nên tẩy chay.' },
  { id: 34, type: 'negative', points: 74, harm: 2, text: 'Con nhỏ này nhìn mặt là thấy tham lam, đúng kiểu mặt mũi bất nhân.' },
  { id: 35, type: 'negative', points: 82, harm: 2, text: 'Tội nghiệp ba mẹ nó, sinh ra đứa con chỉ biết cắn người.' },
  { id: 36, type: 'negative', points: 89, harm: 3, text: 'Loại rác rưởi như này không xứng học chung trường, biến đi cho sạch 🤡' },
  { id: 37, type: 'negative', points: 95, harm: 3, text: 'Thứ như bạn sống làm gì cho chật đất, chết quách đi cho xong.' },
  { id: 38, type: 'negative', points: 90, harm: 3, text: 'Ai biết nó ở đâu chỉ tao, để tao cho nó một trận cho biết mặt.' },
  { id: 39, type: 'negative', points: 86, harm: 3, text: 'Đồ ăn cắp, cả họ nhà nó chắc cũng vậy thôi, đừng dạy đời ai nữa.' },
  { id: 40, type: 'negative', points: 78, harm: 2, text: 'Báo công an bắt nó đi, thể loại này phải cho bài học.' },
  { id: 41, type: 'negative', points: 71, harm: 2, text: 'Tao mà học chung lớp chắc tao tát cho mấy phát rồi.' },
  { id: 42, type: 'negative', points: 65, harm: 1, text: 'Bạn bè gì toàn thể loại này, thà không có còn hơn.' },
  { id: 43, type: 'negative', points: 60, harm: 1, text: 'Trường này nên đuổi học nó để làm gương cho người khác.' },
  { id: 44, type: 'negative', points: 92, harm: 3, text: 'Đăng clip mặt nó lên cho cả nước biết nó là đồ ăn cắp đi mọi người!' },
  { id: 45, type: 'negative', points: 83, harm: 2, text: 'Nhỏ này chắc nuôi dạy kiểu gì mà kinh tởm vậy, cả dòng họ đáng xấu hổ.' },
  { id: 46, type: 'negative', points: 88, harm: 3, text: 'Đứa nào bênh nó chắc cũng cùng loại ăn cắp, cút hết đi.' },
  { id: 47, type: 'negative', points: 76, harm: 2, text: 'Nhìn cái mặt là biết không có giáo dục, đúng kiểu nhà không dạy.' },
  { id: 48, type: 'negative', points: 69, harm: 2, text: 'Loại này nên bị cả xã hội tẩy chay, đừng cho ai chơi với nó nữa.' },
  { id: 49, type: 'negative', points: 94, harm: 3, text: 'Tao mong nó gặp chuyện xấu cho bõ tức, thứ cặn bã.' },
  { id: 50, type: 'negative', points: 87, harm: 3, text: 'Cả nhà nó chắc cũng toàn đồ ăn cắp, đừng tin bất kỳ ai họ Minh này.' },
  { id: 51, type: 'negative', points: 63, harm: 1, text: 'Đăng bài xin lỗi cả trường đi, đồ mặt dày.' },
  { id: 52, type: 'negative', points: 81, harm: 2, text: 'Bạn bè nó chắc cũng tiếp tay, kiểm tra hết mấy đứa trong tổ đi.' },
  { id: 53, type: 'negative', points: 73, harm: 2, text: 'Loại này ra đường chắc gì đã ai thèm nhìn, xấu cả người lẫn nết.' },
  { id: 54, type: 'negative', points: 96, harm: 3, text: 'Ước gì nó biến mất khỏi trường này mãi mãi, đỡ ô nhiễm.' },
  { id: 55, type: 'negative', points: 70, harm: 2, text: 'Minh Anh à, mày nên tự trọng mà xin nghỉ học đi, đừng để người ta đuổi.' },
]