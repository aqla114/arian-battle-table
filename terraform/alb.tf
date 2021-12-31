resource "aws_security_group" "alb" {
  name        = "arianrod-alb"
  description = "arianrod alb"
  vpc_id      = aws_vpc.arianrod.id

  # セキュリティグループ内のリソースからインターネットへのアクセスを許可する
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1" # -1 is all
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port = 80
    to_port   = 80
    protocol  = "tcp"

    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "arianrod-alb"
  }
}

resource "aws_lb" "arianrod_alb" {
  load_balancer_type = "application"
  name               = "arianrod"

  security_groups = ["${aws_security_group.alb.id}"]
  subnets         = ["${aws_subnet.public_1a.id}", "${aws_subnet.public_1c.id}"]
}

resource "aws_alb_listener" "arianrod" {
  load_balancer_arn = aws_lb.arianrod_alb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "fixed-response"

    fixed_response {
      content_type = "text/plain"
      message_body = "Fixed response content"
      status_code  = "200"
    }
  }
}
