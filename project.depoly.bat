@rem ===== 1. ����� jar������ ������ ����
scp -i "D:\keyfile\myworkspace.pem" -r ./build/libs/DouJo_Server*.jar ubuntu@ec2-52-79-96-141.ap-northeast-2.compute.amazonaws.com:/home/ubuntu/doujo/project
@rem ===== 2. jar������ �����ϴ� run.sh ��ũ��Ʈ ������ ������ ����
scp -i "D:\keyfile\myworkspace.pem" -r ./run.sh ubuntu@ec2-52-79-96-141.ap-northeast-2.compute.amazonaws.com:/home/ubuntu/doujo/project
@rem ===== 3. run.sh ��ũ��Ʈ������ ���డ���ϵ��� ���Ѻο�(777 -> rwx rwx rwx)
ssh -i "D:\keyfile\myworkspace.pem" ubuntu@ec2-52-79-96-141.ap-northeast-2.compute.amazonaws.com "sudo chmod 777 /home/ubuntu/doujo/project/run.sh"
@rem ===== 4. jar���� �ִ� ���͸����� �̵��ϰ�, run.sh�� ���� ���μ��� ���̰� ����
ssh -i "D:\keyfile\myworkspace.pem" ubuntu@ec2-52-79-96-141.ap-northeast-2.compute.amazonaws.com "cd /home/ubuntu/doujo/project; ./run.sh project_service"