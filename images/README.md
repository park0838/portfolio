# 필요한 이미지

사이트는 아래 파일이 이 폴더에 있으면 자동으로 표시하고, 없으면 "준비 중" 자리 표시를 보여 줍니다.
파일 이름과 위치를 그대로 맞춰서 넣으면 코드 수정이 필요 없습니다.

## 필수 (게임 QA 지원에 가장 중요)

| 파일 | 내용 | 권장 |
|---|---|---|
| `jumpking-cover.webp` | JumpKing 대표 플레이 화면 | 16:9, 가로 1280px 이상 |
| `amorupari-cover.webp` | Amorupari 대표 플레이 화면 | 16:9, 가로 1280px 이상 |
| `qa-bug-report.webp` | 작성한 버그 리포트 캡처 (Jira, Notion, 스프레드시트 등) | 16:9, 텍스트가 읽히는 해상도 |
| `qa-test-case.webp` | 테스트 케이스 시트 캡처 | 16:9 |
| `qa-test-plan.webp` | 테스트 계획서 첫 페이지 캡처 | 16:9 |

## 있으면 좋은 것 (추가하려면 index.html에 `<figure class="media">` 블록을 복사해 사용)

| 파일 | 내용 |
|---|---|
| `jumpking-01.webp`, `jumpking-02.webp` | 버그가 발생한 장면, 수정 전후 비교 |
| `amorupari-01.webp`, `amorupari-02.webp` | 버그가 발생한 장면, 수정 전후 비교 |
| `bug-*.gif` 또는 `bug-*.mp4` | 버그 재현 영상 (10~20초, 5MB 이하) |
| `cert-istqb.webp` | ISTQB CTFL 자격증 (개인정보 가림) |
| `cert-startup.webp` | 창업경진대회 상장 (개인정보 가림) |
| `og-image.png` | 링크 공유 미리보기 이미지 (1200 x 630) |

## 이미지 만드는 방법
- 게임 화면: Windows에서 `Win + Shift + S`로 캡처하거나 `Win + G`(게임 바)로 녹화합니다.
- 변환: [squoosh.app](https://squoosh.app) 등에서 WebP로 변환하면 용량이 크게 줄어듭니다 (장당 500KB 이하 권장).
- 캡처에 이름, 이메일, 계정 정보, 비공개 게임의 내용이 보이지 않게 가려 주세요.
