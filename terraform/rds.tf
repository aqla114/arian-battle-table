module "rds" {
  source = "./rds"

  name = "arianrod-rds"

  vpc_id     = aws_vpc.arianrod.id
  subnet_ids = ["${aws_subnet.private_1a.id}", "${aws_subnet.private_1c.id}"]

  database_name   = "arian_db"
  master_username = "arianrod_master"
  master_password = "arianrod_password"
}
