import React, { useEffect } from "react";   
import "../styles/about.css"
import img1 from "../image/theforgettingcurve.png"
import img2 from "../image/img2.png"
import img3 from "../image/img3.jpg"
import Menu from "./Menu.js"

const About = function(props) {
    return (
        <div>
            <Menu {...props}></Menu>
            <div class="about-container">
                <p class="about-title">Lịch sử ra đời và cơ sở khoa học của phương pháp “Lặp lại ngắt quãng”</p>
                <p class="about-content">
                Sự ứng dụng nguyên lý “Lặp lại ngắt quãng” được giáo sư Cecil Alec Mace đề cập đến lần đầu qua quyển “Tâm lý trong việc học” (Psychology of Study) vào năm 1932. Trong những năm sau đó, kỹ thuật này cũng được áp dụng trong nghiên cứu nhận thức con người và điều trị cho các bệnh nhân Ailzemer. Tuy nhiên chỉ mãi đến năm 1985, người ta mới có cái nhìn toàn diện và khoa học về phương pháp này thông qua những nghiên cứu của nhà tâm lý học nổi tiếng người Đức Hermann Ebbinghaus. Một trong những phát hiện quan trọng của Hermann Ebbinghaus là tìm ra quy luật của trí nhớ, theo đó trong điều kiện không có sự ôn tập hay gợi nhớ, hầu hết thông tin mà một người học được sẽ mất đi một vài ngày sau đó. Hình bên dưới là Đường cong quên lãng được Ebbinghaus tổng hợp từ các thí nghiệm của ông. Có thể thấy, đường cong này đặc biệt dốc ở những ngày đầu tiên sau khi người học tiếp nhận thông tin, đồng nghĩa với việc lượng kiến thức còn đọng lại trong trí nhớ của họ suy giảm đáng kể. Tuy nhiên, sau một khoảng thời gian, độ dốc của đường giảm dần và người học vẫn nhớ được một phần nhỏ thông tin.
                </p>
                <img src={img1}></img>
                <p class="about-content">
                Trên cơ sở cách thức hoạt động của trí nhớ, Ebbinghaus tiến hành thử nghiệm phương pháp “Lặp lại ngắt quãng” bằng cách nhớ một danh sách các từ cho đến khi thuộc làu và không xem lại danh sách. Khi Ebbinghaus không còn nhớ từ nào trong danh sách nữa, ông học lại các từ này và so sánh với đường cong quên lãng của hai lần. Kết quả là hiệu quả ghi nhớ trong lần thứ hai được cải thiện đáng kể. Biểu đồ bên dưới mô tả hiệu suất lưu trữ qua mỗi lần lặp lại thông tin. Như vậy, khi một người có ý thức ghi nhớ những kiến thức đã học bằng cách đều đặn ôn tập chúng trong nhiều lần, khả năng mà những kiến thức đó được đưa vào bộ nhớ dài hạn của họ tăng lên đáng kể. Cách tiếp cận này chính là phương pháp “Lặp lại ngắt quãng”.
                </p>
                <img src={img2}></img>
                <p class="about-title">Áp dụng hiệu quả phương pháp “Lặp lại ngắt quãng” trong học từ vựng
                </p>
                <p class="about-mini-title">
                Sử dụng flashcards (Leitner System)
                </p>
                <p class="about-content">
                Với tính hiệu quả cao mà phương pháp Lặp lại ngắt quãng mang lại, một số nhà nghiên cứu đã phát triển cách áp dụng kỹ thuật này trong việc học nói chung và học ngoại ngữ nói riêng. Một trong số đó là Sebastian Leitner, người đã kết hợp lặp lại ngắt quãng và flashcards (thẻ ghi nhớ).
                Hình dưới đây mô tả quá trình áp dụng Leitner System
                </p>
                <img src={img3}></img>
                <p class="about-content">
                Theo đó, để chuẩn bị cho phương pháp này, người học cần có 5 chiếc hộp từ vựng đánh số từ 1 đến 5 cũng như các thẻ ghi nhớ với một mặt ghi từ và mặt còn lại chú thích ý nghĩa, phát âm, cách sử dụng… của từ đó.
                Người học xếp tất cả flashcard ghi từ vựng mới học vào hộp thứ nhất, mỗi khi trả lời đúng một flashcard thì di chuyển nó sang hộp thứ hai, nếu vẫn trả lời sai thì để nguyên từ đó trong hộp thứ nhất.
                Lặp lại quá trình tương tự đối với các hộp tiếp theo. Ví dụ, ở hộp thứ hai, những flashcard trả lời đúng sẽ được di chuyển sang hộp thứ ba, những từ trả lời sai sẽ bị đưa về hộp thứ nhất. Cứ như thế cho đến khi tất cả các flashcard của người học đến được hộp thứ 5, đồng nghĩa với việc đã kết thúc chu kỳ ôn tập.
                Với phương pháp này tất cả nội dung đã học sẽ được lặp đi lặp lại cho đến khi người học đã nhớ thông tin. Bên cạnh đó, ưu điểm của cách làm này là phân loại được từ vựng theo mức độ dễ – trung bình – khó để người học không học tràn lan mà chỉ phân bổ thời gian và công sức tập trung vào những từ vựng khó.
                </p>
            </div>
        </div>
    )
}
export default About