@rem ===== 1. 다른 프로젝트에서 할 때는 사전에 /home/ubuntu/app/프로젝트명 디렉터리를 만들어야함
@rem ===== 2. "gateway" 이것을 프로젝트명으로 바꿈

@rem ===== 1. 빌드된 jar파일을 서버에 전송
scp -i "c:\Dou_jo\Dou_Jo\back_end\gateway\registry.pem" -r ./build/libs/gateway*.jar ubuntu@ec2-3-37-96-216.ap-northeast-2.compute.amazonaws.com:/home/ubuntu/app/gateway
@rem ===== 2. jar파일을 실행하는 run.sh 스크립트 파일을 서버에 전송
scp -i "c:\Dou_jo\Dou_Jo\back_end\gateway\registry.pem" -r ./run.sh ubuntu@ec2-3-37-96-216.ap-northeast-2.compute.amazonaws.com:/home/ubuntu/app/gateway

ssh -i "c:\Dou_jo\Dou_Jo\back_end\gateway\registry.pem" ubuntu@ec2-3-37-96-216.ap-northeast-2.compute.amazonaws.com "sudo chmod 777 /home/ubuntu/app/gateway/run.sh"

ssh -i "c:\Dou_jo\Dou_Jo\back_end\gateway\registry.pem" ubuntu@ec2-3-37-96-216.ap-northeast-2.compute.amazonaws.com "cd /home/ubuntu/app/gateway; ./run.sh gateway"